"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@yucachain/shared";
import { Badge } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { formatNaira, formatQuantity } from "@/lib/formatters";
import { displayName } from "@/lib/utils";
import { productService } from "@/services/product.service";
import { ProductGallery } from "./ProductGallery";
import { QuantitySelector } from "./QuantitySelector";

export function ProductDetailsPage({ productId }: { productId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const cart = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    productService.get(productId).then(setProduct).catch((err: Error) => setError(err.message));
  }, [productId]);

  async function add() {
    setError("");
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (user.role !== "BUYER") {
      setError("Sign in with a buyer account to purchase produce.");
      return;
    }
    try {
      await cart.add(productId, quantity);
      setMessage("Added to your cart.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add to cart");
    }
  }

  if (error && !product) return <p className="text-clay">{error}</p>;
  if (!product) return <p className="text-muted">Loading produce…</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <ProductGallery image={product.image} name={product.name} />
      <div>
        {product.seller.verified && <Badge>Verified Seller</Badge>}
        <h1 className="mt-3 font-display text-5xl">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold text-forest">
          {formatNaira(product.price)} <span className="text-base font-medium text-muted">per {product.unit}</span>
        </p>
        <p className="mt-2 text-muted">Available: {formatQuantity(product.quantity, product.unit)}</p>
        {product.harvestTime && <p className="text-sm text-muted">Harvest time: {product.harvestTime}</p>}
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">{product.description}</p>
        <div className="mt-6 rounded-[24px] bg-white p-4">
          <p className="font-semibold">{displayName(product.seller)}</p>
          <p className="text-sm text-muted">
            {product.location}
            {product.seller.rating ? ` · ${product.seller.rating} · ${product.seller.reviewCount} reviews` : ""}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <QuantitySelector value={quantity} max={Math.max(product.quantity, 1)} onChange={setQuantity} />
          <button className="btn-primary" type="button" onClick={add} disabled={product.quantity < 1}>
            Add to cart
          </button>
          <Link href="/marketplace" className="btn-ghost">
            Back to market
          </Link>
        </div>
        {message && <p className="mt-3 text-sm text-forest">{message}</p>}
        {error && product && <p className="mt-3 text-sm text-clay">{error}</p>}
      </div>
    </div>
  );
}
