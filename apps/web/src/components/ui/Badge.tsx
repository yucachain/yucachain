import { cn } from "@/lib/utils";

const tones = {
  green: "bg-forest-soft text-forest",
  lime: "bg-lime text-forest-dark",
  clay: "bg-[#F8E6DA] text-clay",
  gold: "bg-[#F6EBD2] text-gold",
  muted: "bg-black/5 text-muted",
};

export function Badge({ children, tone = "green" }: { children: React.ReactNode; tone?: keyof typeof tones }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}
