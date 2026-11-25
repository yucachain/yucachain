"use client";

import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { BuyerOrdersTable } from "@/components/pages/buyer-dashboard/BuyerOrdersTable";
import { EmptyState } from "@/components/ui";
import { useOrders } from "@/hooks/useOrders";

export default function Page() {
  const { orders, loading, error } = useOrders();
  return (
    <div>
      <DashboardHeader title="Orders" />
      {error && <p className="text-clay">{error}</p>}
      {loading ? <p className="text-muted">Loading orders…</p> : orders.length === 0 ? <EmptyState title="No orders yet" body="Checkout from your cart to start a purchase." /> : <BuyerOrdersTable orders={orders} />}
    </div>
  );
}
