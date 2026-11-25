"use client";

import { useEffect, useState } from "react";
import { ActiveListings } from "./ActiveListings";
import { RecentSales } from "./RecentSales";
import { SellerStats } from "./SellerStats";
import { SellerWelcome } from "./SellerWelcome";
import { orderService } from "@/services/order.service";

export function SellerDashboardPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof orderService.sellerDashboard>> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    orderService.sellerDashboard().then(setData).catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className="text-clay">{error}</p>;
  if (!data) return <p className="text-muted">Loading your farm desk…</p>;

  return (
    <div className="space-y-6">
      <section className="card p-5">
        <SellerWelcome profile={data.profile} />
        <div className="mt-6">
          <SellerStats stats={data.stats} />
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ActiveListings products={data.listings} />
        <RecentSales orders={data.recentSales} />
      </div>
    </div>
  );
}
