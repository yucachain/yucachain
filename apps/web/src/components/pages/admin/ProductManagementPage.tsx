"use client";

import { useEffect, useState } from "react";
import type { Product } from "@yucachain/shared";
import { productService } from "@/services/product.service";
import { formatNaira } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    productService.list().then(setProducts);
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Products</h1>
      {products.map((product) => (
        <article key={product.id} className="card flex items-center justify-between p-4">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-muted">{displayName(product.seller)} · {product.location} · {product.quantity} {product.unit}</p>
          </div>
          <p className="font-semibold">{formatNaira(product.price)}</p>
        </article>
      ))}
    </div>
  );
}
