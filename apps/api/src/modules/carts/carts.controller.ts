import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { IsInt, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { CartsService } from "./carts.service";

class CartItemDto {
  @IsString()
  productId!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

class UpdateCartItemDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

@Controller("cart")
@Roles(Role.BUYER)
export class CartsController {
  constructor(private carts: CartsService) {}

  @Get()
  get(@CurrentUser() user: { id: string }) {
    return this.carts.get(user.id);
  }

  @Post("items")
  add(@CurrentUser() user: { id: string }, @Body() dto: CartItemDto) {
    return this.carts.add(user.id, dto.productId, dto.quantity);
  }

  @Patch("items/:id")
  update(@CurrentUser() user: { id: string }, @Param("id") id: string, @Body() dto: UpdateCartItemDto) {
    return this.carts.update(user.id, id, dto.quantity);
  }

  @Delete("items/:id")
  remove(@CurrentUser() user: { id: string }, @Param("id") id: string) {
    return this.carts.remove(user.id, id);
  }
}
