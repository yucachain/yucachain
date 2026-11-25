"use client";

import { useEffect, useState } from "react";
import type { BankAccount } from "@yucachain/shared";
import { bankAccountService } from "@/services/bank-account.service";
import { BankAccountCard } from "./BankAccountCard";
import { BankAccountForm } from "./BankAccountForm";

export function BankDetailsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setAccounts(await bankAccountService.mine());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load bank details");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-5xl">Bank details</h1>
        <p className="mt-2 text-sm text-muted">Payouts are sent to the account you save here. Editing it sends the account back for verification.</p>
        <div className="mt-5">
          <BankAccountForm initial={accounts[0]} onSaved={load} />
        </div>
        {error && <p className="mt-3 text-sm text-clay">{error}</p>}
      </div>
      <div className="space-y-3">
        {accounts.map((account) => (
          <BankAccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
