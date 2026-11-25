"use client";

import { useEffect, useState } from "react";
import type { Order, Payment } from "@yucachain/shared";
import { formatDate, formatNaira } from "@/lib/formatters";
import { paymentService } from "@/services/payment.service";

export function PaymentManagementPage() {
  const [payments, setPayments] = useState<Array<Payment & { order: Order }>>([]);
  useEffect(() => {
    paymentService.list().then(setPayments);
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Payments</h1>
      {payments.map((payment) => (
        <article key={payment.id} className="card flex items-center justify-between p-4 text-sm">
          <div>
            <p className="font-semibold">{payment.reference}</p>
            <p className="text-muted">{payment.order?.code} · {formatDate(payment.createdAt)}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatNaira(payment.amount)}</p>
            <p>{payment.status}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
