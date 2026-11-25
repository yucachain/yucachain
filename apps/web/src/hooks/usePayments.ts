"use client";

import { paymentService } from "@/services/payment.service";

export function usePayments() {
  return {
    confirm: (orderId: string) => paymentService.confirm(orderId),
    list: () => paymentService.list(),
    commissions: () => paymentService.commissions(),
  };
}
