import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 30 });
  }

  async markRead(userId: string, id: string) {
    const note = await this.prisma.notification.findUnique({ where: { id } });
    if (!note || note.userId !== userId) throw new NotFoundException("Notification not found");
    return this.prisma.notification.update({ where: { id }, data: { read: true } });
  }

  notify(userId: string, title: string, body: string) {
    return this.prisma.notification.create({ data: { userId, title, body } });
  }
}
