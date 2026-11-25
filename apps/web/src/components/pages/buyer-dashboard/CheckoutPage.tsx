"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/lib/formatters";
import { orderService } from "@/services/order.service";

export function CheckoutPage() {
  const { user } = useAuth();
  const { cart, subtotal, refresh } = useCart();
  const router = useRouter();
  const [destination, setDestination] = useState(user?.location || "");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const items = cart?.items ?? [];

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const orders = await orderService.checkout(destination);
      await refresh();
      router.push(orders.length === 1 ? `/buyer/orders/${orders[0].id}` : "/buyer/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="card space-y-4 p-5">
        <h2 className="font-display text-3xl">Delivery</h2>
        <Input label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)} required />
        <p className="text-sm text-muted">Payment is confirmed on the order page. Stock is reserved only after payment succeeds.</p>
        {error && <p className="text-sm text-clay">{error}</p>}
        <Button disabled={pending || items.length === 0}>{pending ? "Placing order…" : "Place order"}</Button>
      </div>
      <aside className="card p-5">
        <h2 className="font-display text-3xl">Order summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          {items.map((item) => (
            <p key={item.id}>
              {item.product.name} · {item.quantity} {item.product.unit}
            </p>
          ))}
        </div>
        <p className="mt-4 font-display text-4xl">{formatNaira(subtotal)}</p>
      </aside>
    </form>
  );
}
