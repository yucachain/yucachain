import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { Role, UserStatus } from "@yucachain/shared";
import { IsBoolean, IsEmail, IsIn, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Roles } from "../../common/decorators/roles.decorator";
import { AdminService } from "./admin.service";

class UserStatusDto {
  @IsIn([UserStatus.ACTIVE, UserStatus.SUSPENDED])
  status!: UserStatus;
}

class VerifyBankDto {
  @IsBoolean()
  verified!: boolean;
}

class SettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(0.3)
  commissionRate?: number;

  @IsOptional()
  @IsString()
  platformName?: string;

  @IsOptional()
  @IsEmail()
  supportEmail?: string;
}

@Controller("admin")
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get("stats")
  stats() {
    return this.admin.stats();
  }

  @Get("users")
  users() {
    return this.admin.users();
  }

  @Patch("users/:id/status")
  status(@Param("id") id: string, @Body() dto: UserStatusDto) {
    return this.admin.setStatus(id, dto.status);
  }

  @Patch("bank-accounts/:id")
  verifyBank(@Param("id") id: string, @Body() dto: VerifyBankDto) {
    return this.admin.verifyBank(id, dto.verified);
  }

  @Get("settings")
  settings() {
    return this.admin.settings();
  }

  @Patch("settings")
  updateSettings(@Body() dto: SettingsDto) {
    return this.admin.updateSettings(dto);
  }
}
