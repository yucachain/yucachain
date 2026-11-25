import type { Product } from "@yucachain/shared";
import { ListingCard } from "./ListingCard";

export function ActiveListings({ products }: { products: Product[] }) {
  const active = products.filter((product) => product.status === "ACTIVE");
  return (
    <section>
      <h2 className="mb-3 font-display text-3xl">Active Listings</h2>
      <div className="grid gap-3">
        {active.map((product) => (
          <ListingCard key={product.id} product={product} />
        ))}
        {active.length === 0 && <p className="text-sm text-muted">Post a listing to appear on the market feed.</p>}
      </div>
    </section>
  );
}
