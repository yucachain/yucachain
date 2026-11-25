import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ProductStatus } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { productInclude } from "../../common/serializers";

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  mine(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId },
      include: productInclude,
      orderBy: { name: "asc" },
    });
  }

  async setStock(sellerId: string, productId: string, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Listing not found");
    if (product.sellerId !== sellerId) throw new ForbiddenException("That listing belongs to another farm");
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        quantity,
        status: quantity > 0 ? ProductStatus.ACTIVE : ProductStatus.SOLD_OUT,
      },
      include: productInclude,
    });
  }

  async decrement(tx: Prisma.TransactionClient, productId: string, quantity: number) {
    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product || product.quantity < quantity) {
      throw new ForbiddenException(`${product?.name ?? "A listing"} does not have enough stock`);
    }
    const next = product.quantity - quantity;
    await tx.product.update({
      where: { id: productId },
      data: { quantity: next, status: next > 0 ? ProductStatus.ACTIVE : ProductStatus.SOLD_OUT },
    });
  }
}
