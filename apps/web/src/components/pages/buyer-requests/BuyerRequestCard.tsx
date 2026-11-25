import Link from "next/link";
import type { BuyerRequest } from "@yucachain/shared";
import { formatNaira, formatQuantity } from "@/lib/formatters";
import { displayName } from "@/lib/utils";

export function BuyerRequestCard({ request }: { request: BuyerRequest }) {
  return (
    <article className="card flex h-full flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-clay">Open Request</p>
      <h3 className="mt-2 font-display text-3xl leading-tight">
        {request.produce} — {formatQuantity(request.quantity, request.unit)}
      </h3>
      <p className="mt-3 text-sm text-muted">Destination: {request.destination}</p>
      <p className="text-sm text-muted">Buyer: {displayName(request.buyer)}</p>
      <p className="text-sm text-muted">Preferred delivery: {request.neededIn}</p>
      <p className="mt-4 font-display text-3xl">{formatNaira(request.budget)}</p>
      <p className="text-sm text-muted">Budget per {request.unit}</p>
      <Link href={`/buyer-requests/${request.id}`} className="btn-primary mt-5 w-full">
        Express Interest
      </Link>
    </article>
  );
}
