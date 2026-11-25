"use client";

import { useEffect, useState } from "react";
import type { Order } from "@yucachain/shared";
import { orderService } from "@/services/order.service";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    try {
      setOrders(await orderService.list());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return { orders, loading, error, refresh, setOrders };
}
