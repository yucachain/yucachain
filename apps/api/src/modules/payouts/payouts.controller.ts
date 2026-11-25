import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PayoutStatus, Role } from "@yucachain/shared";
import { IsIn, IsOptional, IsString } from "class-validator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { PayoutsService } from "./payouts.service";

class DecisionDto {
  @IsIn([PayoutStatus.APPROVED, PayoutStatus.PAID, PayoutStatus.REJECTED])
  status!: PayoutStatus;

  @IsOptional()
  @IsString()
  note?: string;
}

@Controller("payouts")
export class PayoutsController {
  constructor(private payouts: PayoutsService) {}

  @Roles(Role.SELLER)
  @Get("me")
  mine(@CurrentUser() user: { id: string }) {
    return this.payouts.mine(user.id);
  }

  @Roles(Role.SELLER)
  @Post("request")
  request(@CurrentUser() user: { id: string }) {
    return this.payouts.request(user.id);
  }

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.payouts.list();
  }

  @Roles(Role.ADMIN)
  @Patch(":id")
  decide(@Param("id") id: string, @Body() dto: DecisionDto) {
    return this.payouts.decide(id, dto.status, dto.note);
  }
}
