import { formatNaira } from "@/lib/formatters";

export function BuyerStats({
  stats,
}: {
  stats: { openRequests: number; recentPurchases: number; pendingDeliveries: number; totalPurchase: number };
}) {
  const items = [
    ["Open Request", String(stats.openRequests)],
    ["Recent Purchase", String(stats.recentPurchases)],
    ["Pending Deliveries", String(stats.pendingDeliveries)],
    ["Total Purchase", formatNaira(stats.totalPurchase)],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-3xl bg-white p-4">
          <p className="font-display text-3xl">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
