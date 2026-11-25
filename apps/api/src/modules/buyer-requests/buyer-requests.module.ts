import { Module } from "@nestjs/common";
import { NotificationsModule } from "../notifications/notifications.module";
import { BuyerRequestsController } from "./buyer-requests.controller";
import { BuyerRequestsService } from "./buyer-requests.service";

@Module({
  imports: [NotificationsModule],
  controllers: [BuyerRequestsController],
  providers: [BuyerRequestsService],
})
export class BuyerRequestsModule {}
