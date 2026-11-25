import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderStatus, PaymentStatus, PayoutStatus } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { userSelect } from "../../common/serializers";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class PayoutsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async mine(sellerId: string) {
    const [payouts, balance] = await Promise.all([
      this.prisma.payout.findMany({
        where: { sellerId },
        include: { bankAccount: true, seller: { select: userSelect } },
        orderBy: { createdAt: "desc" },
      }),
      this.balance(sellerId),
    ]);
    return { payouts, ...balance };
  }

  list() {
    return this.prisma.payout.findMany({
      include: { bankAccount: true, seller: { select: userSelect } },
      orderBy: { createdAt: "desc" },
    });
  }

  async request(sellerId: string) {
    const { available } = await this.balance(sellerId);
    if (available <= 0) throw new BadRequestException("There is no balance ready to withdraw");
    const bank = await this.prisma.bankAccount.findFirst({ where: { userId: sellerId }, orderBy: { createdAt: "desc" } });
    if (!bank) throw new BadRequestException("Add a bank account before requesting a payout");
    const payout = await this.prisma.payout.create({
      data: {
        sellerId,
        bankAccountId: bank.id,
        amount: available,
        status: PayoutStatus.PENDING,
        note: "Seller payout request",
      },
      include: { bankAccount: true, seller: { select: userSelect } },
    });
    await this.notifications.notify(sellerId, "Payout requested", `₦${available.toLocaleString("en-NG")} is waiting for approval.`);
    return payout;
  }

  async decide(id: string, status: PayoutStatus, note?: string) {
    const payout = await this.prisma.payout.findUnique({ where: { id } });
    if (!payout) throw new NotFoundException("Payout not found");
    const updated = await this.prisma.payout.update({
      where: { id },
      data: { status, note: note ?? payout.note, decidedAt: new Date() },
      include: { bankAccount: true, seller: { select: userSelect } },
    });
    await this.notifications.notify(payout.sellerId, "Payout update", `Your payout is now ${status.toLowerCase()}.`);
    return updated;
  }

  async balance(sellerId: string) {
    const [orders, payouts] = await Promise.all([
      this.prisma.order.findMany({
        where: { sellerId, status: OrderStatus.DELIVERED, payment: { status: PaymentStatus.PAID } },
      }),
      this.prisma.payout.findMany({
        where: { sellerId, status: { not: PayoutStatus.REJECTED } },
      }),
    ]);
    const earned = orders.reduce((sum, order) => sum + (order.subtotal - order.fee), 0);
    const reserved = payouts.reduce((sum, payout) => sum + payout.amount, 0);
    return { earned, reserved, available: Math.max(earned - reserved, 0) };
  }
}
