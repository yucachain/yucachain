import type { Order } from "@yucachain/shared";
import { formatNaira } from "@/lib/formatters";

export function OrderSummary({ orders }: { orders: Order[] }) {
  const total = orders.reduce((sum, order) => sum + order.total, 0);
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl bg-paper p-3 text-sm">
          <p className="font-semibold">{order.code}</p>
          {order.items.map((item) => (
            <p key={item.id}>
              {item.name} · {item.quantity} {item.unit} · {formatNaira(item.unitPrice * item.quantity)}
            </p>
          ))}
        </div>
      ))}
      <p className="font-display text-4xl">{formatNaira(total)}</p>
    </div>
  );
}
