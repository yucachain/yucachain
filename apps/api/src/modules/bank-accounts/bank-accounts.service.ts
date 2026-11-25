import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { userSelect } from "../../common/serializers";

interface BankInput {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

@Injectable()
export class BankAccountsService {
  constructor(private prisma: PrismaService) {}

  mine(userId: string) {
    return this.prisma.bankAccount.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
  }

  async save(userId: string, input: BankInput) {
    const existing = await this.prisma.bankAccount.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } });
    if (existing) {
      return this.prisma.bankAccount.update({
        where: { id: existing.id },
        data: {
          bankName: input.bankName,
          accountName: input.accountName,
          accountNumber: input.accountNumber,
          verified: false,
        },
      });
    }
    return this.prisma.bankAccount.create({
      data: { userId, ...input, verified: false },
    });
  }

  list() {
    return this.prisma.bankAccount.findMany({
      include: { user: { select: userSelect } },
      orderBy: { createdAt: "desc" },
    });
  }

  async setVerified(id: string, verified: boolean) {
    return this.prisma.bankAccount.update({ where: { id }, data: { verified } });
  }
}
