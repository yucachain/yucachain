import { Controller, Get, Param, Patch } from "@nestjs/common";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Get()
  list(@CurrentUser() user: { id: string }) {
    return this.notifications.list(user.id);
  }

  @Patch(":id/read")
  read(@CurrentUser() user: { id: string }, @Param("id") id: string) {
    return this.notifications.markRead(user.id, id);
  }
}
