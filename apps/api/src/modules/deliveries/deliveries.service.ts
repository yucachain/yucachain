import { Injectable } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { orderInclude } from "../../common/serializers";

@Injectable()
export class DeliveriesService {
  constructor(private prisma: PrismaService) {}

  list(user: { id: string; role: string }) {
    const orderWhere = user.role === Role.ADMIN ? {} : user.role === Role.SELLER ? { sellerId: user.id } : { buyerId: user.id };
    return this.prisma.delivery.findMany({
      where: { order: orderWhere },
      include: { order: { include: orderInclude } },
      orderBy: { updatedAt: "desc" },
    });
  }
}
