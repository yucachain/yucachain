"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BuyerRequest } from "@yucachain/shared";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { formatNaira } from "@/lib/formatters";
import { productService } from "@/services/product.service";

export default function Page() {
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    productService.myRequests().then(setRequests).catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div className="space-y-4">
      <DashboardHeader title="Your requests" action={{ href: "/buyer/requests/create", label: "Post Request" }} />
      {error && <p className="text-clay">{error}</p>}
      {requests.map((request) => (
        <Link key={request.id} href={`/buyer-requests/${request.id}`} className="card block p-4">
          <p className="font-semibold">{request.produce}</p>
          <p className="text-sm text-muted">
            {request.quantity} {request.unit} · {request.destination} · {formatNaira(request.budget)} per {request.unit} · {request.status}
          </p>
        </Link>
      ))}
    </div>
  );
}
