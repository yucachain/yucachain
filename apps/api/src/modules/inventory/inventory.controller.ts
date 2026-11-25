import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { Role } from "@yucachain/shared";
import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { InventoryService } from "./inventory.service";

class StockDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity!: number;
}

@Controller("inventory")
@Roles(Role.SELLER)
export class InventoryController {
  constructor(private inventory: InventoryService) {}

  @Get()
  mine(@CurrentUser() user: { id: string }) {
    return this.inventory.mine(user.id);
  }

  @Patch(":productId")
  setStock(@CurrentUser() user: { id: string }, @Param("productId") productId: string, @Body() dto: StockDto) {
    return this.inventory.setStock(user.id, productId, dto.quantity);
  }
}
