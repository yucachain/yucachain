import type { BankAccount } from "@yucachain/shared";
import { BankVerificationStatus } from "./BankVerificationStatus";

export function BankAccountCard({ account }: { account: BankAccount }) {
  return (
    <article className="card p-5">
      <p className="text-sm text-muted">{account.bankName}</p>
      <h3 className="font-display text-3xl">{account.accountName}</h3>
      <p className="mt-1 tracking-widest">{account.accountNumber}</p>
      <div className="mt-3">
        <BankVerificationStatus verified={account.verified} />
      </div>
    </article>
  );
}
