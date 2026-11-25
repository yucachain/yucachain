"use client";

import { useEffect, useState } from "react";
import type { BankAccount } from "@yucachain/shared";
import { Button } from "@/components/ui";
import { displayName } from "@/lib/utils";
import { bankAccountService } from "@/services/bank-account.service";
import { BankVerificationStatus } from "../bank-details/BankVerificationStatus";

export function BankAccountManagementPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  async function load() {
    setAccounts(await bankAccountService.list());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Bank accounts</h1>
      {accounts.map((account) => (
        <article key={account.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{account.accountName}</p>
            <p className="text-sm text-muted">
              {displayName(account.user)} · {account.bankName} · {account.accountNumber}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BankVerificationStatus verified={account.verified} />
            <Button variant="ghost" type="button" onClick={async () => { await bankAccountService.verify(account.id, !account.verified); load(); }}>
              {account.verified ? "Unverify" : "Verify"}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
