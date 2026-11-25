import { Module } from "@nestjs/common";
import { PaymentProviderModule } from "../../integrations/payment-provider/payment-provider.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
  imports: [NotificationsModule, PaymentProviderModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
