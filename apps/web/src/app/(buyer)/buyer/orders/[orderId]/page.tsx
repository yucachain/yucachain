"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Order } from "@yucachain/shared";
import { Button } from "@/components/ui";
import { PaymentPage } from "@/components/pages/payments/PaymentPage";
import { orderLabel } from "@/lib/formatters";
import { displayName } from "@/lib/utils";
import { orderService } from "@/services/order.service";
import { paymentService } from "@/services/payment.service";

export default function Page() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    orderService.get(params.orderId).then(setOrder).catch((err: Error) => setError(err.message));
  }, [params.orderId]);

  async function pay() {
    setPending(true);
    setError("");
    try {
      setOrder(await paymentService.confirm(params.orderId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setPending(false);
    }
  }

  if (error && !order) return <p className="text-clay">{error}</p>;
  if (!order) return <p className="text-muted">Loading order…</p>;

  return (
    <div className="space-y-4">
      <div>
        <p className="eyebrow">{orderLabel(order.status)}</p>
        <h1 className="font-display text-5xl">{order.code}</h1>
        <p className="text-sm text-muted">Seller: {displayName(order.seller)} · {order.destination}</p>
      </div>
      <PaymentPage order={order} />
      {order.payment?.status !== "PAID" && order.status !== "CANCELLED" && (
        <Button type="button" onClick={pay} disabled={pending}>
          {pending ? "Confirming payment…" : "Confirm payment"}
        </Button>
      )}
      {error && <p className="text-sm text-clay">{error}</p>}
    </div>
  );
}
