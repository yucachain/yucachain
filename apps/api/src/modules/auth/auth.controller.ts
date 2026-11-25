import { Body, Controller, Get, Post } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Public } from "../../common/decorators/public.decorator";
import { IsNigerianPhone } from "../../common/validators/phone.validator";
import { AuthService } from "./auth.service";

class RegisterDto {
  @IsString()
  @MinLength(2)
  fullName!: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsNigerianPhone()
  phone!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn([Role.BUYER, Role.SELLER])
  role!: Role;

  @IsOptional()
  @IsString()
  location?: string;
}

class LoginDto {
  @IsNigerianPhone()
  phone!: string;

  @IsString()
  password!: string;
}

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Public()
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get("me")
  me(@CurrentUser() user: { id: string }) {
    return this.auth.me(user.id);
  }
}
