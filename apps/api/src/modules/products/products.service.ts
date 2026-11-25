import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ProductStatus, Role } from "@yucachain/shared";
import { PrismaService } from "../../database/prisma.service";
import { imageForProduce, productInclude } from "../../common/serializers";

interface ProductInput {
  name: string;
  categorySlug: string;
  description?: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  harvestTime?: string;
}

interface ListQuery {
  q?: string;
  category?: string;
  location?: string;
  sort?: string;
  limit?: number;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  list(query: ListQuery) {
    const where: Prisma.ProductWhereInput = {
      status: { not: "DRAFT" },
      ...(query.q
        ? {
            OR: [
              { name: { contains: query.q } },
              { description: { contains: query.q } },
              { seller: { businessName: { contains: query.q } } },
            ],
          }
        : {}),
      ...(query.category && query.category !== "all" ? { category: { slug: query.category } } : {}),
      ...(query.location && query.location !== "all" ? { location: query.location } : {}),
    };
    const orderBy: Prisma.ProductOrderByWithRelationInput =
      query.sort === "price-asc" ? { price: "asc" } : query.sort === "price-desc" ? { price: "desc" } : { createdAt: "desc" };
    return this.prisma.product.findMany({
      where,
      include: productInclude,
      orderBy,
      take: query.limit && query.limit > 0 ? query.limit : undefined,
    });
  }

  mine(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  async get(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id }, include: productInclude });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async create(sellerId: string, input: ProductInput) {
    const category = await this.prisma.category.findUnique({ where: { slug: input.categorySlug } });
    if (!category) throw new NotFoundException("Category not found");
    return this.prisma.product.create({
      data: {
        id: `prd_${Date.now().toString(36)}`,
        sellerId,
        categoryId: category.id,
        name: input.name.trim(),
        description: input.description?.trim() || null,
        price: input.price,
        unit: input.unit,
        quantity: input.quantity,
        location: input.location,
        harvestTime: input.harvestTime?.trim() || null,
        image: imageForProduce(input.name),
        status: input.quantity > 0 ? ProductStatus.ACTIVE : ProductStatus.SOLD_OUT,
      },
      include: productInclude,
    });
  }

  async update(sellerId: string, id: string, input: ProductInput) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Product not found");
    if (existing.sellerId !== sellerId) throw new ForbiddenException("You can only edit your own listings");
    const category = await this.prisma.category.findUnique({ where: { slug: input.categorySlug } });
    if (!category) throw new NotFoundException("Category not found");
    return this.prisma.product.update({
      where: { id },
      data: {
        categoryId: category.id,
        name: input.name.trim(),
        description: input.description?.trim() || null,
        price: input.price,
        unit: input.unit,
        quantity: input.quantity,
        location: input.location,
        harvestTime: input.harvestTime?.trim() || null,
        image: imageForProduce(input.name),
        status: input.quantity > 0 ? ProductStatus.ACTIVE : ProductStatus.SOLD_OUT,
      },
      include: productInclude,
    });
  }

  async remove(user: { id: string; role: string }, id: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Product not found");
    if (user.role !== Role.ADMIN && existing.sellerId !== user.id) {
      throw new ForbiddenException("You can only remove your own listings");
    }
    try {
      await this.prisma.product.delete({ where: { id } });
    } catch {
      throw new BadRequestException("This listing is part of an order, so it cannot be deleted");
    }
    return { ok: true };
  }
}
