import { Controller, Get } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Public } from "./common/decorators/public.decorator";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RolesGuard } from "./common/guards/roles.guard";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { DatabaseModule } from "./database/database.module";
import { AdminModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BankAccountsModule } from "./modules/bank-accounts/bank-accounts.module";
import { BuyerRequestsModule } from "./modules/buyer-requests/buyer-requests.module";
import { BuyersModule } from "./modules/buyers/buyers.module";
import { CartsModule } from "./modules/carts/carts.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { CommissionsModule } from "./modules/commissions/commissions.module";
import { DeliveriesModule } from "./modules/deliveries/deliveries.module";
import { FarmersModule } from "./modules/farmers/farmers.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { PayoutsModule } from "./modules/payouts/payouts.module";
import { ProductsModule } from "./modules/products/products.module";
import { UsersModule } from "./modules/users/users.module";

@Controller()
class HealthController {
  @Public()
  @Get("health")
  health() {
    return { ok: true, service: "yucachain-api" };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env", "../../.env"] }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    FarmersModule,
    BuyersModule,
    ProductsModule,
    CategoriesModule,
    InventoryModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    CommissionsModule,
    PayoutsModule,
    BankAccountsModule,
    DeliveriesModule,
    BuyerRequestsModule,
    NotificationsModule,
    AdminModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
