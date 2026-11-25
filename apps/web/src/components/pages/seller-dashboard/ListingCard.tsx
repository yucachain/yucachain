import Link from "next/link";
import type { Product } from "@yucachain/shared";
import { formatNaira, formatQuantity } from "@/lib/formatters";

export function ListingCard({ product }: { product: Product }) {
  return (
    <article className="card grid gap-3 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
      <img src={product.image || "/images/products/produce.svg"} alt="" className="h-24 w-full rounded-2xl object-cover sm:w-24" />
      <div>
        <h3 className="font-display text-2xl">{product.name}</h3>
        <p className="text-sm text-muted">Available: {formatQuantity(product.quantity, product.unit)}</p>
        {product.harvestTime && <p className="text-sm text-muted">Harvest time: {product.harvestTime}</p>}
        <p className="text-sm text-muted">{product.location}</p>
      </div>
      <div className="text-left sm:text-right">
        <p className="font-semibold">{formatNaira(product.price)} per {product.unit}</p>
        <Link href={`/seller/listings/${product.id}/edit`} className="mt-2 inline-block text-sm font-semibold text-forest">
          Edit
        </Link>
      </div>
    </article>
  );
}
