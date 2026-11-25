"use client";

import { useEffect, useState } from "react";
import { AdminStats } from "./AdminStats";
import { FinancialOverview } from "./FinancialOverview";
import { authService } from "@/services/auth.service";

export function AdminDashboardPage() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof authService.stats>> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    authService.stats().then(setStats).catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className="text-clay">{error}</p>;
  if (!stats) return <p className="text-muted">Loading the market desk…</p>;
  return (
    <div className="space-y-6">
      <h1 className="font-display text-5xl">Market desk</h1>
      <AdminStats stats={stats} />
      <FinancialOverview gmv={stats.gmv} commission={stats.commissionAccrued} />
    </div>
  );
}
