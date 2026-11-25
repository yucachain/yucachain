import type { Order } from "@yucachain/shared";
import { formatDate, formatNaira } from "@/lib/formatters";

export function TransactionReceipt({ order }: { order: Order }) {
  if (!order.payment) return null;
  return (
    <div className="rounded-2xl border border-dashed border-forest/30 p-4 text-sm">
      <p className="font-semibold">Receipt {order.payment.reference}</p>
      <p>{formatNaira(order.payment.amount)} via {order.payment.method}</p>
      <p className="text-muted">{order.payment.paidAt ? formatDate(order.payment.paidAt) : "Pending"}</p>
    </div>
  );
}
