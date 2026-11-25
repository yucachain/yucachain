import { BadRequestException, Injectable } from "@nestjs/common";
import { Role, UserStatus } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { userSelect } from "../../common/serializers";
import { CommissionsService } from "../commissions/commissions.service";

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private commissions: CommissionsService,
  ) {}

  async stats() {
    const [users, farmers, buyers, products, orders, payments, payouts, commission] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: Role.SELLER } }),
      this.prisma.user.count({ where: { role: Role.BUYER } }),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
      this.prisma.payout.count({ where: { status: "PENDING" } }),
      this.commissions.summary(),
    ]);
    return {
      users,
      farmers,
      buyers,
      products,
      orders,
      gmv: payments._sum.amount ?? 0,
      pendingPayouts: payouts,
      commissionAccrued: commission.accrued,
    };
  }

  users() {
    return this.prisma.user.findMany({ select: userSelect, orderBy: { createdAt: "desc" } });
  }

  async setStatus(id: string, status: UserStatus) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException("User not found");
    if (user.role === Role.ADMIN) throw new BadRequestException("The admin account stays active");
    return this.prisma.user.update({ where: { id }, data: { status }, select: userSelect });
  }

  verifyBank(id: string, verified: boolean) {
    return this.prisma.bankAccount.update({
      where: { id },
      data: { verified },
      include: { user: { select: userSelect } },
    });
  }

  settings() {
    return this.prisma.setting.findUniqueOrThrow({ where: { id: "default" } });
  }

  updateSettings(data: { commissionRate?: number; platformName?: string; supportEmail?: string }) {
    return this.prisma.setting.update({ where: { id: "default" }, data });
  }
}
