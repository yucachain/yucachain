import { formatNaira } from "@/lib/formatters";

export function AdminStats({
  stats,
}: {
  stats: { users: number; farmers: number; buyers: number; products: number; orders: number; gmv: number; pendingPayouts: number; commissionAccrued: number };
}) {
  const items = [
    ["Users", String(stats.users)],
    ["Farmers", String(stats.farmers)],
    ["Buyers", String(stats.buyers)],
    ["Products", String(stats.products)],
    ["Orders", String(stats.orders)],
    ["GMV", formatNaira(stats.gmv)],
    ["Pending payouts", String(stats.pendingPayouts)],
    ["Commission", formatNaira(stats.commissionAccrued)],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([label, value]) => (
        <article key={label} className="card p-4">
          <p className="font-display text-3xl">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </article>
      ))}
    </div>
  );
}
