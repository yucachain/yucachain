import { formatNaira } from "@/lib/formatters";

export function SellerStats({
  stats,
}: {
  stats: { rating: number; reviewCount: number; activeListings: number; activeSales: number; totalSales: number };
}) {
  const items = [
    [`${stats.rating}`, `${stats.reviewCount} Reviews`],
    [String(stats.activeListings), "Active Listings"],
    [String(stats.activeSales), "Active Sales"],
    [formatNaira(stats.totalSales), "Total Sales"],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([value, label]) => (
        <div key={label} className="rounded-3xl bg-white p-4">
          <p className="font-display text-3xl">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
