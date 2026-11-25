import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { userSelect } from "../../common/serializers";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  get(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id }, select: userSelect });
  }

  update(id: string, data: { fullName?: string; businessName?: string; location?: string; bio?: string }) {
    return this.prisma.user.update({
      where: { id },
      data: {
        fullName: data.fullName?.trim(),
        businessName: data.businessName?.trim(),
        location: data.location?.trim(),
        bio: data.bio?.trim(),
      },
      select: userSelect,
    });
  }
}
