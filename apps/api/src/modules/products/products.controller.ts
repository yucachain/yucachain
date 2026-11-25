import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Public } from "../../common/decorators/public.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { ProductsService } from "./products.service";

class ListProductsQuery {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}

class ProductDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  categorySlug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  price!: number;

  @IsString()
  unit!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity!: number;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  harvestTime?: string;
}

@Controller("products")
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Public()
  @Get()
  list(@Query() query: ListProductsQuery) {
    return this.products.list(query);
  }

  @Roles(Role.SELLER)
  @Get("mine")
  mine(@CurrentUser() user: { id: string }) {
    return this.products.mine(user.id);
  }

  @Public()
  @Get(":id")
  get(@Param("id") id: string) {
    return this.products.get(id);
  }

  @Roles(Role.SELLER)
  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: ProductDto) {
    return this.products.create(user.id, dto);
  }

  @Roles(Role.SELLER)
  @Patch(":id")
  update(@CurrentUser() user: { id: string }, @Param("id") id: string, @Body() dto: ProductDto) {
    return this.products.update(user.id, id, dto);
  }

  @Roles(Role.SELLER, Role.ADMIN)
  @Delete(":id")
  remove(@CurrentUser() user: { id: string; role: string }, @Param("id") id: string) {
    return this.products.remove(user, id);
  }
}
