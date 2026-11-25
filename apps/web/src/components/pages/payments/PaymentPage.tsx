import type { Order } from "@yucachain/shared";
import { PaymentStatus } from "./PaymentStatus";
import { PaymentSummary } from "./PaymentSummary";
import { TransactionReceipt } from "./TransactionReceipt";

export function PaymentPage({ order }: { order: Order }) {
  return (
    <div className="grid gap-4">
      <PaymentSummary order={order} />
      <PaymentStatus status={order.payment?.status || "PENDING"} />
      {order.payment?.status === "PAID" && order.payment && <TransactionReceipt order={order} />}
    </div>
  );
}
