import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductStatus } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { productInclude } from "../../common/serializers";

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async get(buyerId: string) {
    const cart = await this.ensure(buyerId);
    return this.prisma.cart.findUniqueOrThrow({
      where: { id: cart.id },
      include: { items: { include: { product: { include: productInclude } }, orderBy: { id: "asc" } } },
    });
  }

  async add(buyerId: string, productId: string, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.status === ProductStatus.DRAFT) throw new NotFoundException("Product not found");
    if (product.sellerId === buyerId) throw new BadRequestException("You cannot buy your own listing");
    if (product.quantity < quantity) throw new BadRequestException("Not enough stock for that quantity");
    const cart = await this.ensure(buyerId);
    const existing = await this.prisma.cartItem.findUnique({ where: { cartId_productId: { cartId: cart.id, productId } } });
    const next = (existing?.quantity ?? 0) + quantity;
    if (product.quantity < next) throw new BadRequestException("Not enough stock for that quantity");
    if (existing) {
      await this.prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: next } });
    } else {
      await this.prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } });
    }
    return this.get(buyerId);
  }

  async update(buyerId: string, itemId: string, quantity: number) {
    const item = await this.ownedItem(buyerId, itemId);
    if (item.product.quantity < quantity) throw new BadRequestException("Not enough stock for that quantity");
    await this.prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
    return this.get(buyerId);
  }

  async remove(buyerId: string, itemId: string) {
    await this.ownedItem(buyerId, itemId);
    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return this.get(buyerId);
  }

  private async ensure(buyerId: string) {
    return this.prisma.cart.upsert({
      where: { buyerId },
      update: {},
      create: { buyerId },
    });
  }

  private async ownedItem(buyerId: string, itemId: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId }, include: { cart: true, product: true } });
    if (!item || item.cart.buyerId !== buyerId) throw new NotFoundException("Cart item not found");
    return item;
  }
}
