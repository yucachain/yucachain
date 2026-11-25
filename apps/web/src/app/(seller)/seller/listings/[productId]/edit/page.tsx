"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Product } from "@yucachain/shared";
import { CreateListingForm } from "@/components/pages/seller-dashboard/CreateListingForm";
import { productService } from "@/services/product.service";

export default function Page() {
  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    productService.get(params.productId).then(setProduct).catch((err: Error) => setError(err.message));
  }, [params.productId]);

  if (error) return <p className="text-clay">{error}</p>;
  if (!product) return <p className="text-muted">Loading listing…</p>;

  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Edit {product.name}</h1>
      <CreateListingForm
        productId={product.id}
        initial={{
          name: product.name,
          categorySlug: product.category.slug,
          description: product.description || "",
          price: product.price,
          unit: product.unit,
          quantity: product.quantity,
          location: product.location,
          harvestTime: product.harvestTime || "",
        }}
      />
    </div>
  );
}
