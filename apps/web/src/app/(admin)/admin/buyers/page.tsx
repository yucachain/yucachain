"use client";

import { useEffect, useState } from "react";
import type { PublicUser } from "@yucachain/shared";
import { authService } from "@/services/auth.service";

type Buyer = PublicUser & { _count?: { ordersBought: number; buyerRequests: number } };

export default function Page() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  useEffect(() => {
    authService.buyers().then(setBuyers);
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Buyers</h1>
      {buyers.map((buyer) => (
        <article key={buyer.id} className="card p-4">
          <p className="font-semibold">{buyer.businessName || buyer.fullName}</p>
          <p className="text-sm text-muted">
            {buyer.location} · {buyer.phone} · {buyer._count?.ordersBought ?? 0} purchases · {buyer._count?.buyerRequests ?? 0} requests
          </p>
        </article>
      ))}
    </div>
  );
}
