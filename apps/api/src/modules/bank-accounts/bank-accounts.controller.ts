import { Body, Controller, Get, Post } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { IsOptional, IsString, Length, MinLength } from "class-validator";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { BankAccountsService } from "./bank-accounts.service";

class BankAccountDto {
  @IsString()
  @MinLength(2)
  bankName!: string;

  @IsString()
  @MinLength(2)
  accountName!: string;

  @IsString()
  @Length(10, 10)
  accountNumber!: string;
}

@Controller("bank-accounts")
export class BankAccountsController {
  constructor(private accounts: BankAccountsService) {}

  @Get("me")
  mine(@CurrentUser() user: { id: string }) {
    return this.accounts.mine(user.id);
  }

  @Roles(Role.SELLER)
  @Post()
  save(@CurrentUser() user: { id: string }, @Body() dto: BankAccountDto) {
    return this.accounts.save(user.id, dto);
  }

  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.accounts.list();
  }
}
