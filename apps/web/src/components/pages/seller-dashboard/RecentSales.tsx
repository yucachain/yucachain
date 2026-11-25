import Link from "next/link";
import type { Order } from "@yucachain/shared";
import { formatDate, formatNaira, orderLabel } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function RecentSales({ orders }: { orders: Order[] }) {
  return (
    <section className="card p-5">
      <h2 className="font-display text-3xl">Recent Sales</h2>
      <div className="mt-4 space-y-3">
        {orders.slice(0, 6).map((order) => (
          <Link key={order.id} href={`/seller/orders/${order.id}`} className="block rounded-2xl bg-paper p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{order.items[0]?.name}</p>
                <p className="text-sm text-muted">
                  {order.items[0]?.quantity} {order.items[0]?.unit} · Buyer: {displayName(order.buyer)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatNaira(order.total)}</p>
                <p className="text-sm text-muted">
                  {formatDate(order.createdAt)} · {orderLabel(order.status)}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {orders.length === 0 && <p className="text-sm text-muted">Paid orders will land here.</p>}
      </div>
    </section>
  );
}
