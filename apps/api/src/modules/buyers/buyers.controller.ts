import { Controller, Get } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { BuyersService } from "./buyers.service";

@Controller("buyers")
export class BuyersController {
  constructor(private buyers: BuyersService) {}

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.buyers.list();
  }

  @Roles(Role.BUYER)
  @Get("dashboard")
  dashboard(@CurrentUser() user: { id: string }) {
    return this.buyers.dashboard(user.id);
  }
}
