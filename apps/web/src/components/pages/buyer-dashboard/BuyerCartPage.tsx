"use client";

import Link from "next/link";
import { EmptyState } from "@/components/ui";
import { useCart } from "@/hooks/useCart";
import { formatNaira, formatQuantity } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function BuyerCartPage() {
  const { cart, subtotal, update, remove } = useCart();
  const items = cart?.items ?? [];

  if (items.length === 0) {
    return <EmptyState title="Your cart is empty" body="Browse the marketplace and add produce from farms across Ogun State." />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="card flex gap-4 p-4">
            <img src={item.product.image || "/images/products/produce.jpg"} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="flex-1">
              <h3 className="font-display text-2xl">{item.product.name}</h3>
              <p className="text-sm text-muted">
                {displayName(item.product.seller)} · {item.product.location}
              </p>
              <p className="mt-1 text-sm">{formatNaira(item.product.price)} per {item.product.unit}</p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  className="field !w-24"
                  type="number"
                  min={1}
                  max={item.product.quantity}
                  value={item.quantity}
                  onChange={(event) => update(item.id, Number(event.target.value))}
                />
                <span className="text-sm text-muted">{formatQuantity(item.quantity, item.product.unit)}</span>
                <button className="text-sm text-clay" type="button" onClick={() => remove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
            <p className="font-semibold">{formatNaira(item.product.price * item.quantity)}</p>
          </article>
        ))}
      </div>
      <aside className="card h-fit p-5">
        <p className="text-sm text-muted">Subtotal</p>
        <p className="font-display text-4xl">{formatNaira(subtotal)}</p>
        <Link href="/buyer/checkout" className="btn-primary mt-4 w-full">
          Checkout
        </Link>
      </aside>
    </div>
  );
}
