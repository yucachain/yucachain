"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { productService } from "@/services/product.service";
import { Button, Input } from "@/components/ui";

export function SellerInterestForm({ requestId }: { requestId: string }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  if (!user) return <p className="text-sm text-muted">Sign in as a seller to express interest.</p>;
  if (user.role !== "SELLER") return <p className="text-sm text-muted">Buyer accounts can post requests. Seller accounts respond to them.</p>;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await productService.expressInterest(requestId, {
        message,
        price: price ? Number(price) : undefined,
      });
      setNotice("Interest sent to the buyer.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send interest");
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5">
      <h3 className="font-display text-3xl">Express interest</h3>
      <Input label="Message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What you can supply, and when" />
      <Input label="Offer per unit (₦)" type="number" min={1} value={price} onChange={(event) => setPrice(event.target.value)} />
      {error && <p className="text-sm text-clay">{error}</p>}
      {notice && <p className="text-sm text-forest">{notice}</p>}
      <Button type="submit">Send interest</Button>
    </form>
  );
}
