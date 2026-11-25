import { Module } from "@nestjs/common";
import { CommissionsModule } from "../commissions/commissions.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [CommissionsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
