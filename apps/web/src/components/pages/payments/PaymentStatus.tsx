import { Badge } from "@/components/ui";

export function PaymentStatus({ status }: { status: string }) {
  const tone = status === "PAID" ? "green" : status === "FAILED" ? "clay" : "gold";
  return (
    <p className="flex items-center gap-2 text-sm">
      Payment <Badge tone={tone}>{status}</Badge>
    </p>
  );
}
