"use client";

import { useEffect, useState } from "react";
import type { PublicUser } from "@yucachain/shared";
import { Badge, Button } from "@/components/ui";
import { authService } from "@/services/auth.service";

type Farmer = PublicUser & { _count?: { products: number; ordersSold: number } };

export function FarmerManagementPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  async function load() {
    setFarmers(await authService.farmers());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Farmers</h1>
      {farmers.map((farmer) => (
        <article key={farmer.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{farmer.businessName}</p>
            <p className="text-sm text-muted">
              {farmer.location} · {farmer._count?.products ?? 0} listings · {farmer._count?.ordersSold ?? 0} orders · {farmer.rating} rating
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={farmer.verified ? "green" : "gold"}>{farmer.verified ? "Verified" : "Unverified"}</Badge>
            <Button variant="ghost" type="button" onClick={async () => { await authService.toggleFarmer(farmer.id); load(); }}>
              Toggle verification
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
