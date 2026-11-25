"use client";

import Link from "next/link";
import type { Order } from "@yucachain/shared";
import { Badge } from "@/components/ui";
import { formatDate, formatNaira, orderLabel } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function SellerOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Link key={order.id} href={`/seller/orders/${order.id}`} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{order.code}</p>
            <p className="text-sm text-muted">
              {displayName(order.buyer)} · {order.items.map((item) => `${item.name} (${item.quantity} ${item.unit})`).join(", ")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">{formatNaira(order.total)}</span>
            <Badge>{orderLabel(order.status)}</Badge>
            <span className="text-sm text-muted">{formatDate(order.createdAt)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
