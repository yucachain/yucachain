"use client";

import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { usePayouts } from "@/hooks/usePayouts";
import { formatDate, formatNaira } from "@/lib/formatters";
import { payoutService } from "@/services/payout.service";

export function SellerPayoutsPage() {
  const { data, loading, error, refresh } = usePayouts();
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");

  async function request() {
    setFormError("");
    setNotice("");
    try {
      await payoutService.request();
      setNotice("Payout request sent for approval.");
      await refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not request payout");
    }
  }

  if (loading) return <p className="text-muted">Loading payouts…</p>;
  if (error) return <p className="text-clay">{error}</p>;
  if (!data) return null;

  return (
    <div className="space-y-5">
      <h1 className="font-display text-5xl">Payouts</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card p-4"><p className="text-sm text-muted">Earned after fees</p><p className="font-display text-3xl">{formatNaira(data.earned)}</p></div>
        <div className="card p-4"><p className="text-sm text-muted">Reserved</p><p className="font-display text-3xl">{formatNaira(data.reserved)}</p></div>
        <div className="card p-4"><p className="text-sm text-muted">Available</p><p className="font-display text-3xl">{formatNaira(data.available)}</p></div>
      </div>
      <Button type="button" onClick={request} disabled={data.available <= 0}>Request payout</Button>
      {notice && <p className="text-sm text-forest">{notice}</p>}
      {formError && <p className="text-sm text-clay">{formError}</p>}
      <div className="space-y-3">
        {data.payouts.map((payout) => (
          <article key={payout.id} className="card flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{formatNaira(payout.amount)}</p>
              <p className="text-sm text-muted">{payout.note} · {formatDate(payout.createdAt)}</p>
            </div>
            <Badge tone={payout.status === "PAID" ? "green" : payout.status === "REJECTED" ? "clay" : "gold"}>{payout.status}</Badge>
          </article>
        ))}
      </div>
    </div>
  );
}
