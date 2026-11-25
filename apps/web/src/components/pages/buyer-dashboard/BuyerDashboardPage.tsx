"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BuyerStats } from "./BuyerStats";
import { PendingDeliveries } from "./PendingDeliveries";
import { RecentPurchases } from "./RecentPurchases";
import { displayName, initials } from "@/lib/utils";
import { orderService } from "@/services/order.service";

export function BuyerDashboardPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof orderService.buyerDashboard>> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    orderService.buyerDashboard().then(setData).catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className="text-clay">{error}</p>;
  if (!data) return <p className="text-muted">Loading your desk…</p>;
  const name = displayName(data.profile);

  return (
    <div className="space-y-6">
      <section className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-lime font-display text-2xl">{initials(name)}</div>
            <div>
              <h1 className="font-display text-4xl">{name}</h1>
              <p className="text-sm text-muted">
                {data.profile.location} · Buyer
              </p>
              <p className="mt-2 max-w-xl text-sm">{data.profile.bio}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/buyer/profile" className="btn-ghost">Edit Profile</Link>
            <Link href="/buyer/requests/create" className="btn-primary">Post Request</Link>
          </div>
        </div>
        <div className="mt-6">
          <BuyerStats stats={data.stats} />
        </div>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentPurchases orders={data.orders} />
        <PendingDeliveries orders={data.pending} />
      </div>
    </div>
  );
}
