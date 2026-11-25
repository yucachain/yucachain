"use client";

import { useEffect, useState } from "react";
import type { Payout } from "@yucachain/shared";
import { payoutService } from "@/services/payout.service";

export function usePayouts() {
  const [data, setData] = useState<{ payouts: Payout[]; earned: number; reserved: number; available: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    try {
      setData(await payoutService.mine());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load payouts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return { data, loading, error, refresh };
}
