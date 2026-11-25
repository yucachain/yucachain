import { ProductDetailsPage } from "@/components/pages/marketplace/ProductDetailsPage";

export default async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <ProductDetailsPage productId={productId} />;
}
