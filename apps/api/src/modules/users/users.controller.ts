import { Body, Controller, Get, Patch } from "@nestjs/common";
import { IsOptional, IsString, MinLength } from "class-validator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { UsersService } from "./users.service";

class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}

@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Get("me")
  me(@CurrentUser() user: { id: string }) {
    return this.users.get(user.id);
  }

  @Patch("me")
  update(@CurrentUser() user: { id: string }, @Body() dto: UpdateProfileDto) {
    return this.users.update(user.id, dto);
  }
}
