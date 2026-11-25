import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { RequestStatus } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { userSelect } from "../../common/serializers";
import { NotificationsService } from "../notifications/notifications.service";

interface RequestInput {
  produce: string;
  quantity: number;
  unit: string;
  destination: string;
  budget: number;
  neededIn: string;
  notes?: string;
}

@Injectable()
export class BuyerRequestsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  list(limit?: number) {
    return this.prisma.buyerRequest.findMany({
      where: { status: RequestStatus.OPEN },
      include: { buyer: { select: userSelect }, interests: { include: { seller: { select: userSelect } } } },
      orderBy: { createdAt: "desc" },
      take: limit && limit > 0 ? limit : undefined,
    });
  }

  mine(buyerId: string) {
    return this.prisma.buyerRequest.findMany({
      where: { buyerId },
      include: { buyer: { select: userSelect }, interests: { include: { seller: { select: userSelect } } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async get(id: string) {
    const request = await this.prisma.buyerRequest.findUnique({
      where: { id },
      include: { buyer: { select: userSelect }, interests: { include: { seller: { select: userSelect } }, orderBy: { createdAt: "desc" } } },
    });
    if (!request) throw new NotFoundException("Request not found");
    return request;
  }

  create(buyerId: string, input: RequestInput) {
    return this.prisma.buyerRequest.create({
      data: {
        id: `req_${Date.now().toString(36)}`,
        buyerId,
        produce: input.produce.trim(),
        quantity: input.quantity,
        unit: input.unit,
        destination: input.destination.trim(),
        budget: input.budget,
        neededIn: input.neededIn.trim(),
        notes: input.notes?.trim() || null,
      },
      include: { buyer: { select: userSelect } },
    });
  }

  async expressInterest(sellerId: string, requestId: string, input: { message?: string; price?: number }) {
    const request = await this.prisma.buyerRequest.findUnique({ where: { id: requestId } });
    if (!request || request.status !== RequestStatus.OPEN) throw new NotFoundException("That request is no longer open");
    if (request.buyerId === sellerId) throw new BadRequestException("You cannot respond to your own request");
    try {
      const interest = await this.prisma.sellerInterest.create({
        data: {
          requestId,
          sellerId,
          message: input.message?.trim() || null,
          price: input.price,
        },
        include: { seller: { select: userSelect }, request: true },
      });
      const seller = interest.seller.businessName || interest.seller.fullName;
      await this.notifications.notify(
        request.buyerId,
        "A seller responded",
        `${seller} expressed interest in your ${request.produce} request.`,
      );
      return interest;
    } catch {
      throw new ConflictException("You already expressed interest in this request");
    }
  }
}
