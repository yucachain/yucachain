import { Badge } from "@/components/ui";

export function BankVerificationStatus({ verified }: { verified: boolean }) {
  return <Badge tone={verified ? "green" : "gold"}>{verified ? "Verified" : "Pending verification"}</Badge>;
}
