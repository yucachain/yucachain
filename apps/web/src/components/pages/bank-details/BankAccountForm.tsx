"use client";

import { useEffect, useState } from "react";
import { NIGERIAN_BANKS } from "@yucachain/shared";
import type { BankAccount } from "@yucachain/shared";
import { Button, Input, Select } from "@/components/ui";
import { bankAccountService } from "@/services/bank-account.service";

export function BankAccountForm({ initial, onSaved }: { initial?: BankAccount; onSaved: () => void }) {
  const [bankName, setBankName] = useState(initial?.bankName || "GTBank");
  const [accountName, setAccountName] = useState(initial?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(initial?.accountNumber || "");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!initial) return;
    setBankName(initial.bankName);
    setAccountName(initial.accountName);
    setAccountNumber(initial.accountNumber);
  }, [initial]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await bankAccountService.save({ bankName, accountName, accountNumber });
      setNotice("Bank account saved.");
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save account");
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-5">
      <Select label="Bank" value={bankName} onChange={(event) => setBankName(event.target.value)}>
        {NIGERIAN_BANKS.map((bank) => (
          <option key={bank}>{bank}</option>
        ))}
      </Select>
      <Input label="Account name" value={accountName} onChange={(event) => setAccountName(event.target.value)} required />
      <Input label="Account number" value={accountNumber} onChange={(event) => setAccountNumber(event.target.value)} minLength={10} maxLength={10} required />
      {error && <p className="text-sm text-clay">{error}</p>}
      {notice && <p className="text-sm text-forest">{notice}</p>}
      <Button>Save account</Button>
    </form>
  );
}
