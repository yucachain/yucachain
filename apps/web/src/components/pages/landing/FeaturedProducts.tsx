"use client";

import { ProductGrid } from "../marketplace/ProductGrid";
import { Skeleton } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";

export function FeaturedProducts() {
  const { products, loading, error } = useProducts({ sort: "recent", limit: 6 });
  return (
    <section className="mt-20">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Recently listed</p>
          <h2 className="font-display text-4xl">Produce on the market today</h2>
        </div>
      </div>
      {error && <p className="text-sm text-clay">{error}</p>}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}
