"use client";

import { useOrders } from "@/hooks/useOrders";
import { SellerOrdersTable } from "./SellerOrdersTable";

export function SellerSalesPage() {
  const { orders, loading, error } = useOrders();
  const sales = orders.filter((order) => order.payment?.status === "PAID");
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Sales</h1>
      {error && <p className="text-clay">{error}</p>}
      {loading ? <p className="text-muted">Loading sales…</p> : <SellerOrdersTable orders={sales} />}
    </div>
  );
}
