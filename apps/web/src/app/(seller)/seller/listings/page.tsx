"use client";

import { useEffect, useState } from "react";
import type { Product } from "@yucachain/shared";
import Link from "next/link";
import { ListingTable } from "@/components/pages/seller-dashboard/ListingTable";
import { StockAvailability } from "@/components/pages/seller-dashboard/StockAvailability";
import { productService } from "@/services/product.service";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  function load() {
    productService.mine().then(setProducts);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-5xl">Listings</h1>
        <Link href="/seller/listings/create" className="btn-primary">Create listing</Link>
      </div>
      <ListingTable products={products} onChange={load} />
      <section className="space-y-4">
        <h2 className="font-display text-3xl">Stock</h2>
        {products.map((product) => (
          <StockAvailability
            key={product.id}
            product={product}
            onSaved={(next) => setProducts((current) => current.map((item) => (item.id === next.id ? next : item)))}
          />
        ))}
      </section>
    </div>
  );
}
