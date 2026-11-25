import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.payments.list();
  }

  @Roles(Role.BUYER)
  @Post(":orderId/confirm")
  confirm(@CurrentUser() user: { id: string }, @Param("orderId") orderId: string) {
    return this.payments.confirm(user.id, orderId);
  }
}
