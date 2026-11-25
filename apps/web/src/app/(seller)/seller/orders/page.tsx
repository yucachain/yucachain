"use client";

import { SellerOrdersTable } from "@/components/pages/seller-dashboard/SellerOrdersTable";
import { useOrders } from "@/hooks/useOrders";

export default function Page() {
  const { orders, loading, error } = useOrders();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Orders</h1>
      {error && <p className="text-clay">{error}</p>}
      {loading ? <p className="text-muted">Loading orders…</p> : <SellerOrdersTable orders={orders} />}
    </div>
  );
}
