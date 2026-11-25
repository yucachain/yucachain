import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DeliveryStatus, OrderStatus, PaymentStatus, Role } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { orderCode, orderInclude, productInclude } from "../../common/serializers";
import { commissionAmount } from "../commissions/commission.util";
import { NotificationsService } from "../notifications/notifications.service";
import { PaymentProviderService } from "../../integrations/payment-provider/payment-provider.service";

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private payments: PaymentProviderService,
  ) {}

  list(user: { id: string; role: string }) {
    const where =
      user.role === Role.ADMIN ? {} : user.role === Role.SELLER ? { sellerId: user.id } : { buyerId: user.id };
    return this.prisma.order.findMany({ where, include: orderInclude, orderBy: { createdAt: "desc" } });
  }

  async get(user: { id: string; role: string }, id: string) {
    const order = await this.prisma.order.findUnique({ where: { id }, include: orderInclude });
    if (!order) throw new NotFoundException("Order not found");
    if (user.role !== Role.ADMIN && order.buyerId !== user.id && order.sellerId !== user.id) {
      throw new ForbiddenException("You cannot view this order");
    }
    return order;
  }

  async checkout(buyerId: string, destination: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { buyerId },
      include: { items: { include: { product: { include: productInclude } } } },
    });
    if (!cart || cart.items.length === 0) throw new BadRequestException("Your cart is empty");
    const settings = await this.prisma.setting.findUnique({ where: { id: "default" } });
    const rate = settings?.commissionRate ?? 0.05;
    const groups = new Map<string, typeof cart.items>();
    for (const item of cart.items) {
      if (item.quantity > item.product.quantity) {
        throw new BadRequestException(`${item.product.name} no longer has enough stock`);
      }
      const bucket = groups.get(item.product.sellerId) ?? [];
      bucket.push(item);
      groups.set(item.product.sellerId, bucket);
    }

    const orders = [];
    for (const [sellerId, items] of groups) {
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const fee = commissionAmount(subtotal, rate);
      const id = `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
      const order = await this.prisma.order.create({
        data: {
          id,
          code: orderCode(),
          buyerId,
          sellerId,
          destination: destination.trim(),
          subtotal,
          fee,
          total: subtotal,
          status: OrderStatus.PENDING_PAYMENT,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              name: item.product.name,
              quantity: item.quantity,
              unit: item.product.unit,
              unitPrice: item.product.price,
            })),
          },
          payment: {
            create: {
              amount: subtotal,
              status: PaymentStatus.PENDING,
              reference: this.payments.createReference(),
            },
          },
          delivery: { create: { address: destination.trim(), status: DeliveryStatus.PENDING } },
          commission: { create: { rate, amount: fee, status: "PENDING" } },
        },
        include: orderInclude,
      });
      orders.push(order);
      await this.notifications.notify(sellerId, "New order placed", `A buyer placed ${order.code}. Payment is still pending.`);
    }
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return orders;
  }

  async updateStatus(sellerId: string, id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id }, include: { payment: true, buyer: true } });
    if (!order) throw new NotFoundException("Order not found");
    if (order.sellerId !== sellerId) throw new ForbiddenException("This order belongs to another seller");
    if (order.payment?.status !== PaymentStatus.PAID && status !== OrderStatus.CANCELLED) {
      throw new BadRequestException("Wait for payment before moving this order");
    }
    const allowed: Record<string, OrderStatus[]> = {
      [OrderStatus.CONFIRMED]: [OrderStatus.IN_TRANSIT, OrderStatus.CANCELLED],
      [OrderStatus.IN_TRANSIT]: [OrderStatus.DELIVERED],
      [OrderStatus.PENDING_PAYMENT]: [OrderStatus.CANCELLED],
    };
    if (!allowed[order.status]?.includes(status)) {
      throw new BadRequestException("That status change is not available");
    }
    const delivery =
      status === OrderStatus.IN_TRANSIT
        ? DeliveryStatus.IN_TRANSIT
        : status === OrderStatus.DELIVERED
          ? DeliveryStatus.DELIVERED
          : status === OrderStatus.CANCELLED
            ? DeliveryStatus.CANCELLED
            : undefined;
    const updated = await this.prisma.order.update({
      where: { id },
      data: {
        status,
        ...(delivery ? { delivery: { update: { status: delivery } } } : {}),
      },
      include: orderInclude,
    });
    await this.notifications.notify(order.buyerId, "Order update", `${order.code} is now ${status.replaceAll("_", " ").toLowerCase()}.`);
    return updated;
  }
}
