import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DeliveryStatus, OrderStatus, PaymentStatus } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { orderInclude, userSelect } from "../../common/serializers";
import { PaymentProviderService } from "../../integrations/payment-provider/payment-provider.service";
import { InventoryService } from "../inventory/inventory.service";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private provider: PaymentProviderService,
    private inventory: InventoryService,
    private notifications: NotificationsService,
  ) {}

  list() {
    return this.prisma.payment.findMany({
      include: { order: { include: { buyer: { select: userSelect }, seller: { select: userSelect } } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async confirm(buyerId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true, items: true, buyer: true, seller: true },
    });
    if (!order || !order.payment) throw new NotFoundException("Order not found");
    if (order.buyerId !== buyerId) throw new ForbiddenException("This order belongs to another buyer");
    if (order.payment.status === PaymentStatus.PAID) {
      return this.prisma.order.findUnique({ where: { id: orderId }, include: orderInclude });
    }
    if (order.status === OrderStatus.CANCELLED) throw new BadRequestException("This order was cancelled");

    const charge = await this.provider.charge({
      amount: order.total,
      reference: order.payment.reference,
      phone: order.buyer.phone,
    });
    if (charge.status !== "SUCCESS") throw new BadRequestException("Payment could not be completed");

    await this.prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        if (item.productId) await this.inventory.decrement(tx, item.productId, item.quantity);
      }
      await tx.payment.update({
        where: { orderId },
        data: { status: PaymentStatus.PAID, paidAt: new Date() },
      });
      await tx.order.update({ where: { id: orderId }, data: { status: OrderStatus.CONFIRMED } });
      await tx.delivery.update({ where: { orderId }, data: { status: DeliveryStatus.PREPARING } });
      await tx.commission.update({ where: { orderId }, data: { status: "ACCRUED" } });
    });

    const sellerName = order.seller.businessName || order.seller.fullName;
    await this.notifications.notify(order.sellerId, "New paid order", `${order.buyer.businessName || order.buyer.fullName} paid for ${order.code}.`);
    await this.notifications.notify(buyerId, "Payment received", `Your payment to ${sellerName} for ${order.code} is confirmed.`);
    return this.prisma.order.findUnique({ where: { id: orderId }, include: orderInclude });
  }
}
