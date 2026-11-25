import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderStatus, PaymentStatus, ProductStatus, Role } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { orderInclude, productInclude, userSelect } from "../../common/serializers";

@Injectable()
export class FarmersService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.user.findMany({
      where: { role: Role.SELLER },
      select: {
        ...userSelect,
        _count: { select: { products: true, ordersSold: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async dashboard(sellerId: string) {
    const [profile, listings, orders] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({ where: { id: sellerId }, select: userSelect }),
      this.prisma.product.findMany({ where: { sellerId }, include: productInclude, orderBy: { createdAt: "desc" } }),
      this.prisma.order.findMany({ where: { sellerId }, include: orderInclude, orderBy: { createdAt: "desc" } }),
    ]);
    const paid = orders.filter((order) => order.payment?.status === PaymentStatus.PAID && order.status !== OrderStatus.CANCELLED);
    return {
      profile,
      stats: {
        rating: profile.rating,
        reviewCount: profile.reviewCount,
        activeListings: listings.filter((item) => item.status === ProductStatus.ACTIVE).length,
        activeSales: paid.filter((order) => order.status === OrderStatus.CONFIRMED || order.status === OrderStatus.IN_TRANSIT).length,
        totalSales: paid.reduce((sum, order) => sum + order.subtotal, 0),
      },
      listings,
      recentSales: paid,
    };
  }

  async toggleVerification(id: string) {
    const farmer = await this.prisma.user.findFirst({ where: { id, role: Role.SELLER } });
    if (!farmer) throw new NotFoundException("Farmer not found");
    return this.prisma.user.update({
      where: { id },
      data: { verified: !farmer.verified },
      select: userSelect,
    });
  }
}
