import { Controller, Get } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { Roles } from "../../common/decorators/roles.decorator";
import { CommissionsService } from "./commissions.service";

@Controller("commissions")
export class CommissionsController {
  constructor(private commissions: CommissionsService) {}

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.commissions.list();
  }
}
