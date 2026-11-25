"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Order } from "@yucachain/shared";
import { Button } from "@/components/ui";
import { PaymentSummary } from "@/components/pages/payments/PaymentSummary";
import { formatNaira, orderLabel } from "@/lib/formatters";
import { displayName } from "@/lib/utils";
import { orderService } from "@/services/order.service";

export default function Page() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    orderService.get(params.orderId).then(setOrder).catch((err: Error) => setError(err.message));
  }, [params.orderId]);

  async function move(status: string) {
    setError("");
    try {
      setOrder(await orderService.updateStatus(params.orderId, status));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update order");
    }
  }

  if (!order && error) return <p className="text-clay">{error}</p>;
  if (!order) return <p className="text-muted">Loading order…</p>;

  return (
    <div className="space-y-4">
      <div>
        <p className="eyebrow">{orderLabel(order.status)}</p>
        <h1 className="font-display text-5xl">{order.code}</h1>
        <p className="text-sm text-muted">Buyer: {displayName(order.buyer)} · You receive {formatNaira(order.subtotal - order.fee)} after the platform fee.</p>
      </div>
      <PaymentSummary order={order} />
      <div className="flex flex-wrap gap-2">
        {order.status === "CONFIRMED" && <Button type="button" onClick={() => move("IN_TRANSIT")}>Mark in transit</Button>}
        {order.status === "IN_TRANSIT" && <Button type="button" onClick={() => move("DELIVERED")}>Mark delivered</Button>}
        {(order.status === "CONFIRMED" || order.status === "PENDING_PAYMENT") && (
          <Button variant="ghost" type="button" onClick={() => move("CANCELLED")}>Cancel</Button>
        )}
      </div>
      {error && <p className="text-sm text-clay">{error}</p>}
    </div>
  );
}
