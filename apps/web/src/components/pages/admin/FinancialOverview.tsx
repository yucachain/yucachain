"use client";

import { formatNaira } from "@/lib/formatters";

export function FinancialOverview({ gmv, commission }: { gmv: number; commission: number }) {
  return (
    <section className="card bg-forest p-6 text-white">
      <p className="text-xs uppercase tracking-[0.16em] text-lime">Financial overview</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-[#D5E4DA]">Paid order volume</p>
          <p className="font-display text-4xl">{formatNaira(gmv)}</p>
        </div>
        <div>
          <p className="text-sm text-[#D5E4DA]">Commission accrued</p>
          <p className="font-display text-4xl">{formatNaira(commission)}</p>
        </div>
      </div>
    </section>
  );
}
