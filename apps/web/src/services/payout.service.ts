import type { Payout, PublicUser } from "@yucachain/shared";
import { api } from "./api-client";

export const payoutService = {
  mine() {
    return api<{ payouts: Payout[]; earned: number; reserved: number; available: number }>("/payouts/me");
  },
  request() {
    return api<Payout>("/payouts/request", { method: "POST" });
  },
  list() {
    return api<Payout[]>("/payouts");
  },
  decide(id: string, status: string, note?: string) {
    return api<Payout>(`/payouts/${id}`, { method: "PATCH", body: JSON.stringify({ status, note }) });
  },
};

export type SellerProfile = PublicUser;
