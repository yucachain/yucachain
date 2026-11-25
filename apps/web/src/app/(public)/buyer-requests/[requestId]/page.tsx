import { BuyerRequestDetails } from "@/components/pages/buyer-requests/BuyerRequestDetails";

export default async function Page({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;
  return <BuyerRequestDetails requestId={requestId} />;
}
