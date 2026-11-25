"use client";

import { useEffect, useState } from "react";
import type { Product } from "@yucachain/shared";
import { inventoryService } from "@/services/inventory.service";

export function useInventory() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    try {
      setItems(await inventoryService.list());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load stock");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return { items, loading, error, refresh, setItems };
}
