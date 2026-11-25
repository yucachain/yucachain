import { Injectable } from "@nestjs/common";
import { OrderStatus, PaymentStatus, RequestStatus, Role } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { orderInclude, userSelect } from "../../common/serializers";

@Injectable()
export class BuyersService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.user.findMany({
      where: { role: Role.BUYER },
      select: {
        ...userSelect,
        _count: { select: { ordersBought: true, buyerRequests: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async dashboard(buyerId: string) {
    const [profile, requests, orders] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({ where: { id: buyerId }, select: userSelect }),
      this.prisma.buyerRequest.findMany({
        where: { buyerId },
        orderBy: { createdAt: "desc" },
        include: { buyer: { select: userSelect } },
      }),
      this.prisma.order.findMany({
        where: { buyerId },
        include: orderInclude,
        orderBy: { createdAt: "desc" },
      }),
    ]);
    const paid = orders.filter((order) => order.payment?.status === PaymentStatus.PAID);
    const pending = orders.filter((order) =>
      [OrderStatus.CONFIRMED, OrderStatus.IN_TRANSIT, OrderStatus.PENDING_PAYMENT].includes(order.status as OrderStatus),
    );
    return {
      profile,
      stats: {
        openRequests: requests.filter((item) => item.status === RequestStatus.OPEN).length,
        recentPurchases: paid.length,
        pendingDeliveries: pending.length,
        totalPurchase: paid.reduce((sum, order) => sum + order.total, 0),
      },
      requests,
      orders,
      pending,
    };
  }
}
