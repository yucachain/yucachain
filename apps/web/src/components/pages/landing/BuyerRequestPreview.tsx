"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BuyerRequest } from "@yucachain/shared";
import { productService } from "@/services/product.service";
import { formatNaira, formatQuantity } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function BuyerRequestPreview() {
  const [requests, setRequests] = useState<BuyerRequest[]>([]);

  useEffect(() => {
    productService.requests(3).then(setRequests).catch(() => setRequests([]));
  }, []);

  return (
    <section className="mt-20">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="eyebrow">What buyers are sourcing</p>
          <h2 className="font-display text-4xl">Discover procurement opportunities</h2>
        </div>
        <Link href="/buyer-requests" className="text-sm font-semibold text-forest">
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {requests.map((request) => (
          <Link key={request.id} href={`/buyer-requests/${request.id}`} className="card block p-5 hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-clay">Open request</p>
            <h3 className="mt-2 font-display text-3xl">{request.produce}</h3>
            <p className="mt-2 text-sm text-muted">
              {formatQuantity(request.quantity, request.unit)} · {request.destination} · {request.neededIn}
            </p>
            <p className="mt-4 font-display text-3xl">{formatNaira(request.budget)}</p>
            <p className="text-sm text-muted">Budget per {request.unit}</p>
            <p className="mt-3 text-sm">{displayName(request.buyer)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
