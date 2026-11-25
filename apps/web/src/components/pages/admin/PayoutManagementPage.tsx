"use client";

import { useEffect, useState } from "react";
import type { Payout } from "@yucachain/shared";
import { Badge, Button } from "@/components/ui";
import { formatDate, formatNaira } from "@/lib/formatters";
import { payoutService } from "@/services/payout.service";
import { PayoutApprovalModal } from "./PayoutApprovalModal";

export function PayoutManagementPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [selected, setSelected] = useState<Payout | null>(null);

  async function load() {
    setPayouts(await payoutService.list());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Payouts</h1>
      {payouts.map((payout) => (
        <article key={payout.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{payout.seller.businessName} · {formatNaira(payout.amount)}</p>
            <p className="text-sm text-muted">{formatDate(payout.createdAt)} · {payout.note}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge>{payout.status}</Badge>
            <Button variant="ghost" type="button" onClick={() => setSelected(payout)}>Review</Button>
          </div>
        </article>
      ))}
      <PayoutApprovalModal payout={selected} onClose={() => setSelected(null)} onDone={load} />
    </div>
  );
}
