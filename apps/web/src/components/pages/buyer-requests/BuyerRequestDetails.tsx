"use client";

import { useEffect, useState } from "react";
import type { BuyerRequest } from "@yucachain/shared";
import { formatDate, formatNaira, formatQuantity } from "@/lib/formatters";
import { displayName } from "@/lib/utils";
import { productService } from "@/services/product.service";
import { SellerInterestForm } from "./SellerInterestForm";

export function BuyerRequestDetails({ requestId }: { requestId: string }) {
  const [request, setRequest] = useState<BuyerRequest | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    productService.request(requestId).then(setRequest).catch((err: Error) => setError(err.message));
  }, [requestId]);

  if (error) return <p className="text-clay">{error}</p>;
  if (!request) return <p className="text-muted">Loading request…</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="card p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-clay">{request.status === "OPEN" ? "Open Request" : request.status}</p>
        <h1 className="mt-2 font-display text-5xl">
          {request.produce} — {formatQuantity(request.quantity, request.unit)}
        </h1>
        <dl className="mt-6 grid gap-3 text-sm">
          <div>Destination: {request.destination}</div>
          <div>Buyer: {displayName(request.buyer)}</div>
          <div>Preferred delivery: {request.neededIn}</div>
          <div className="font-display text-4xl">{formatNaira(request.budget)}</div>
          <div className="text-muted">Budget per {request.unit}</div>
          {request.notes && <p className="text-muted">{request.notes}</p>}
        </dl>
        <div className="mt-6 space-y-3">
          <h2 className="font-display text-3xl">Seller responses</h2>
          {(request.interests ?? []).length === 0 && <p className="text-sm text-muted">No seller has responded yet.</p>}
          {(request.interests ?? []).map((interest) => (
            <div key={interest.id} className="rounded-2xl bg-paper p-3 text-sm">
              <p className="font-semibold">{displayName(interest.seller)}</p>
              <p>{interest.message}</p>
              {interest.price ? <p>{formatNaira(interest.price)} per {request.unit}</p> : null}
              <p className="text-muted">{formatDate(interest.createdAt)}</p>
            </div>
          ))}
        </div>
      </article>
      <SellerInterestForm requestId={request.id} />
    </div>
  );
}
