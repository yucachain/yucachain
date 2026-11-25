import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { orderInclude } from "../../common/serializers";

@Injectable()
export class CommissionsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.commission.findMany({
      include: { order: { include: orderInclude } },
      orderBy: { createdAt: "desc" },
    });
  }

  async summary() {
    const rows = await this.prisma.commission.findMany();
    const accrued = rows.filter((row) => row.status === "ACCRUED" || row.status === "SETTLED");
    return {
      count: rows.length,
      accrued: accrued.reduce((sum, row) => sum + row.amount, 0),
    };
  }
}
