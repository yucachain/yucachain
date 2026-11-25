import type { BankAccount } from "@yucachain/shared";
import { api } from "./api-client";

export const bankAccountService = {
  mine() {
    return api<BankAccount[]>("/bank-accounts/me");
  },
  save(input: { bankName: string; accountName: string; accountNumber: string }) {
    return api<BankAccount>("/bank-accounts", { method: "POST", body: JSON.stringify(input) });
  },
  list() {
    return api<BankAccount[]>("/bank-accounts");
  },
  verify(id: string, verified: boolean) {
    return api<BankAccount>(`/admin/bank-accounts/${id}`, { method: "PATCH", body: JSON.stringify({ verified }) });
  },
};
