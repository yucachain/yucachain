import { Controller, Get, Param, Patch } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { FarmersService } from "./farmers.service";

@Controller("farmers")
export class FarmersController {
  constructor(private farmers: FarmersService) {}

  @Roles(Role.SELLER)
  @Get("dashboard")
  dashboard(@CurrentUser() user: { id: string }) {
    return this.farmers.dashboard(user.id);
  }

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.farmers.list();
  }

  @Roles(Role.ADMIN)
  @Patch(":id/verification")
  toggle(@Param("id") id: string) {
    return this.farmers.toggleVerification(id);
  }
}
