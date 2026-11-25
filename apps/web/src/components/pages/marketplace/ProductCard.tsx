import Link from "next/link";
import type { Product } from "@yucachain/shared";
import { Badge } from "@/components/ui";
import { formatNaira, formatQuantity } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative h-44">
        <img src={product.image || "/images/products/produce.svg"} alt="" className="h-full w-full object-cover" />
        {product.seller.verified && (
          <span className="absolute left-3 top-3">
            <Badge>Verified Seller</Badge>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-3xl leading-none">{product.name}</h3>
        <p className="mt-2 text-lg font-semibold text-forest">
          {formatNaira(product.price)} <span className="text-sm font-medium text-muted">per {product.unit}</span>
        </p>
        <p className="mt-1 text-sm text-muted">Available: {formatQuantity(product.quantity, product.unit)}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-medium">{displayName(product.seller)}</span>
          <span className="text-muted">{product.location}</span>
        </div>
        <Link href={`/marketplace/${product.id}`} className="btn-ghost mt-4 w-full">
          View Product
        </Link>
      </div>
    </article>
  );
}
