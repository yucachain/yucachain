"use client";

import { useEffect, useState } from "react";
import type { Commission, Order } from "@yucachain/shared";
import { formatNaira } from "@/lib/formatters";
import { paymentService } from "@/services/payment.service";

export function CommissionManagementPage() {
  const [rows, setRows] = useState<Array<Commission & { order: Order }>>([]);
  useEffect(() => {
    paymentService.commissions().then(setRows);
  }, []);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Commissions</h1>
      <p className="text-muted">Recorded fees: {formatNaira(total)}. Default rate is 5% of each order.</p>
      {rows.map((row) => (
        <article key={row.id} className="card flex items-center justify-between p-4 text-sm">
          <p>{row.order.code} · {(row.rate * 100).toFixed(0)}%</p>
          <p className="font-semibold">{formatNaira(row.amount)} · {row.status}</p>
        </article>
      ))}
    </div>
  );
}
