"use client";

import { useOrders } from "@/hooks/useOrders";
import { formatDate, formatNaira, orderLabel } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function OrderManagementPage() {
  const { orders, loading } = useOrders();
  if (loading) return <p>Loading orders…</p>;
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Orders</h1>
      {orders.map((order) => (
        <article key={order.id} className="card flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
          <div>
            <p className="font-semibold">{order.code}</p>
            <p className="text-muted">{displayName(order.buyer)} → {displayName(order.seller)}</p>
          </div>
          <p>{formatNaira(order.total)}</p>
          <p>{orderLabel(order.status)}</p>
          <p className="text-muted">{formatDate(order.createdAt)}</p>
        </article>
      ))}
    </div>
  );
}
