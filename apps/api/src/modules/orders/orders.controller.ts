import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderStatus, Role } from "@yucachain/shared";
import { IsIn, IsOptional, IsString } from "class-validator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { OrdersService } from "./orders.service";

class CheckoutDto {
  @IsString()
  destination!: string;
}

class StatusDto {
  @IsIn([OrderStatus.IN_TRANSIT, OrderStatus.DELIVERED, OrderStatus.CANCELLED])
  status!: OrderStatus;
}

@Controller("orders")
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get()
  list(@CurrentUser() user: { id: string; role: string }) {
    return this.orders.list(user);
  }

  @Roles(Role.BUYER)
  @Post("checkout")
  checkout(@CurrentUser() user: { id: string }, @Body() dto: CheckoutDto) {
    return this.orders.checkout(user.id, dto.destination);
  }

  @Get(":id")
  get(@CurrentUser() user: { id: string; role: string }, @Param("id") id: string) {
    return this.orders.get(user, id);
  }

  @Roles(Role.SELLER)
  @Patch(":id/status")
  status(@CurrentUser() user: { id: string }, @Param("id") id: string, @Body() dto: StatusDto) {
    return this.orders.updateStatus(user.id, id, dto.status);
  }
}
