"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@yucachain/shared";
import { Badge, EmptyState } from "@/components/ui";
import { formatNaira, formatQuantity } from "@/lib/formatters";
import { productService } from "@/services/product.service";

export function ListingTable({ products, onChange }: { products: Product[]; onChange: () => void }) {
  const [error, setError] = useState("");
  if (products.length === 0) return <EmptyState title="No listings yet" body="Create a listing and it will show on the public marketplace." />;

  async function remove(id: string) {
    setError("");
    try {
      await productService.remove(id);
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete listing");
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-clay">{error}</p>}
      {products.map((product) => (
        <article key={product.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-muted">
              {formatNaira(product.price)} per {product.unit} · {formatQuantity(product.quantity, product.unit)} · {product.location}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={product.status === "ACTIVE" ? "green" : "muted"}>{product.status.replace("_", " ")}</Badge>
            <Link href={`/seller/listings/${product.id}/edit`} className="text-sm font-semibold text-forest">
              Edit
            </Link>
            <button className="text-sm text-clay" type="button" onClick={() => remove(product.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
