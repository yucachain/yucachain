import type { Product } from "@yucachain/shared";
import { api } from "./api-client";

export const inventoryService = {
  list() {
    return api<Product[]>("/inventory");
  },
  setStock(productId: string, quantity: number) {
    return api<Product>(`/inventory/${productId}`, { method: "PATCH", body: JSON.stringify({ quantity }) });
  },
};
