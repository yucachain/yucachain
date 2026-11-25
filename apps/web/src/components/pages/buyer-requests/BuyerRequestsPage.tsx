"use client";

import { useEffect, useMemo, useState } from "react";
import type { BuyerRequest } from "@yucachain/shared";
import { EmptyState } from "@/components/ui";
import { productService } from "@/services/product.service";
import { BuyerRequestCard } from "./BuyerRequestCard";
import { RequestFilters } from "./RequestFilters";
import Link from "next/link";

export function BuyerRequestsPage() {
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    productService.requests().then(setRequests).catch((err: Error) => setError(err.message));
  }, []);

  const visible = useMemo(
    () =>
      requests.filter((request) => {
        const haystack = `${request.produce} ${request.destination} ${request.buyer.businessName ?? ""}`.toLowerCase();
        const matchesQuery = haystack.includes(q.toLowerCase());
        const matchesLocation = location === "all" || request.destination === location;
        return matchesQuery && matchesLocation;
      }),
    [requests, q, location],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Buyer requests</p>
          <h1 className="font-display text-5xl">What buyers are sourcing</h1>
          <p className="mt-2 max-w-2xl text-muted">Discover procurement opportunities and respond with your available supply.</p>
        </div>
        <Link href="/buyer/requests/create" className="btn-lime">
          Post Request
        </Link>
      </div>
      <RequestFilters q={q} location={location} onQuery={setQ} onLocation={setLocation} />
      {error && <p className="text-sm text-clay">{error}</p>}
      {visible.length === 0 ? (
        <EmptyState title="No open requests" body="When buyers post a quantity, destination and budget, the request shows up here." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((request) => (
            <BuyerRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
