import type { Product } from "@yucachain/shared";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <EmptyState title="No produce matches" body="Try another crop, location or category. New listings appear here as soon as sellers post them." />;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
