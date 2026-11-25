import Link from "next/link";
import type { Order } from "@yucachain/shared";
import { orderLabel } from "@/lib/formatters";

export function PendingDeliveries({ orders }: { orders: Order[] }) {
  return (
    <section className="card p-5">
      <h2 className="font-display text-3xl">Pending deliveries</h2>
      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <Link key={order.id} href={`/buyer/orders/${order.id}`} className="block text-sm">
            <span className="font-semibold">{order.code}</span>
            <span className="text-muted"> · {orderLabel(order.status)} · {order.destination}</span>
          </Link>
        ))}
        {orders.length === 0 && <p className="text-sm text-muted">Nothing is in transit right now.</p>}
      </div>
    </section>
  );
}
