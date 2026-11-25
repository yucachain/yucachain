"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { MarketplaceHeader } from "./MarketplaceHeader";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { ProductSearch } from "./ProductSearch";
import { Skeleton } from "@/components/ui";
import { useProducts } from "@/hooks/useProducts";

export function MarketplacePage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("recent");
  const query = useMemo(() => ({ q, category, location, sort }), [q, category, location, sort]);
  const { products, loading, error } = useProducts(query);

  return (
    <div className="space-y-6">
      <MarketplaceHeader />
      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
        <ProductSearch value={q} onChange={setQ} />
        <ProductFilters location={location} sort={sort} onLocation={setLocation} onSort={setSort} />
      </div>
      <CategoryFilter value={category} onChange={setCategory} />
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
    </div>
  );
}
