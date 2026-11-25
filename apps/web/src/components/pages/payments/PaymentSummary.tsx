import type { Order } from "@yucachain/shared";
import { formatNaira } from "@/lib/formatters";

export function PaymentSummary({ order }: { order: Order }) {
  return (
    <div className="rounded-2xl bg-paper p-4 text-sm">
      <p className="font-semibold">{order.code}</p>
      {order.items.map((item) => (
        <p key={item.id}>
          {item.name} · {item.quantity} {item.unit} · {formatNaira(item.unitPrice * item.quantity)}
        </p>
      ))}
      <p className="mt-2 font-display text-3xl">{formatNaira(order.total)}</p>
      <p className="text-muted">Platform fee on this sale: {formatNaira(order.fee)}, kept from the seller payout.</p>
    </div>
  );
}
