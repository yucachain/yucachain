import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { DeliveriesService } from "./deliveries.service";

@Controller("deliveries")
export class DeliveriesController {
  constructor(private deliveries: DeliveriesService) {}

  @Get()
  list(@CurrentUser() user: { id: string; role: string }) {
    return this.deliveries.list(user);
  }
}
