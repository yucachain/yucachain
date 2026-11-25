import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Public } from "../../common/decorators/public.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { BuyerRequestsService } from "./buyer-requests.service";

class CreateRequestDto {
  @IsString()
  @MinLength(2)
  produce!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;

  @IsString()
  unit!: string;

  @IsString()
  destination!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  budget!: number;

  @IsString()
  neededIn!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

class InterestDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  price?: number;
}

@Controller("buyer-requests")
export class BuyerRequestsController {
  constructor(private requests: BuyerRequestsService) {}

  @Public()
  @Get()
  list(@Query("limit") limit?: string) {
    return this.requests.list(limit ? Number(limit) : undefined);
  }

  @Roles(Role.BUYER)
  @Get("mine")
  mine(@CurrentUser() user: { id: string }) {
    return this.requests.mine(user.id);
  }

  @Public()
  @Get(":id")
  get(@Param("id") id: string) {
    return this.requests.get(id);
  }

  @Roles(Role.BUYER)
  @Post()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateRequestDto) {
    return this.requests.create(user.id, dto);
  }

  @Roles(Role.SELLER)
  @Post(":id/interest")
  interest(@CurrentUser() user: { id: string }, @Param("id") id: string, @Body() dto: InterestDto) {
    return this.requests.expressInterest(user.id, id, dto);
  }
}
