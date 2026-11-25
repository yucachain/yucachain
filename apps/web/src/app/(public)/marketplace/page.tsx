import { Suspense } from "react";
import { MarketplacePage } from "@/components/pages/marketplace/MarketplacePage";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-muted">Opening the market…</p>}>
      <MarketplacePage />
    </Suspense>
  );
}
