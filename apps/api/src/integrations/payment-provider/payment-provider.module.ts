import { Module } from "@nestjs/common";
import { PaymentProviderService } from "./payment-provider.service";

@Module({
  providers: [PaymentProviderService],
  exports: [PaymentProviderService],
})
export class PaymentProviderModule {}
