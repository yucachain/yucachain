import type { Order, Payment } from "@yucachain/shared";
import { api } from "./api-client";

export const paymentService = {
  confirm(orderId: string) {
    return api<Order>(`/payments/${orderId}/confirm`, { method: "POST" });
  },
  list() {
    return api<Array<Payment & { order: Order }>>("/payments");
  },
  commissions() {
    return api<Array<import("@yucachain/shared").Commission & { order: Order }>>("/commissions");
  },
};
