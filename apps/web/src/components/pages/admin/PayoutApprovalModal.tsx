"use client";

import { useState } from "react";
import type { Payout } from "@yucachain/shared";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui";
import { formatNaira } from "@/lib/formatters";
import { payoutService } from "@/services/payout.service";

export function PayoutApprovalModal({
  payout,
  onClose,
  onDone,
}: {
  payout: Payout | null;
  onClose: () => void;
  onDone: () => void;
}) {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  async function decide(status: "APPROVED" | "PAID" | "REJECTED") {
    if (!payout) return;
    setError("");
    try {
      await payoutService.decide(payout.id, status, note);
      onDone();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update payout");
    }
  }

  return (
    <Modal open={Boolean(payout)} title="Payout decision" onClose={onClose}>
      {payout && (
        <div className="space-y-3">
          <p className="font-display text-4xl">{formatNaira(payout.amount)}</p>
          <p className="text-sm text-muted">{payout.seller.businessName} · {payout.bankAccount?.bankName} {payout.bankAccount?.accountNumber}</p>
          <textarea className="field min-h-24" placeholder="Note for the seller" value={note} onChange={(event) => setNote(event.target.value)} />
          {error && <p className="text-sm text-clay">{error}</p>}
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => decide("APPROVED")}>Approve</Button>
            <Button type="button" variant="lime" onClick={() => decide("PAID")}>Mark paid</Button>
            <Button type="button" variant="ghost" onClick={() => decide("REJECTED")}>Reject</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
