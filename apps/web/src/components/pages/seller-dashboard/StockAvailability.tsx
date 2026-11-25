"use client";

import { useState } from "react";
import type { Product } from "@yucachain/shared";
import { Button, Input } from "@/components/ui";
import { inventoryService } from "@/services/inventory.service";

export function StockAvailability({ product, onSaved }: { product: Product; onSaved: (product: Product) => void }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [error, setError] = useState("");

  async function save() {
    setError("");
    try {
      onSaved(await inventoryService.setStock(product.id, quantity));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update stock");
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      <Input label={product.name} type="number" min={0} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
      <Button type="button" onClick={save}>
        Update stock
      </Button>
      {error && <p className="text-sm text-clay">{error}</p>}
    </div>
  );
}
