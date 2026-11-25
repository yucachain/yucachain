export function Skeleton({ className = "h-24" }: { className?: string }) {
  return <div className={`animate-pulse rounded-3xl bg-forest/10 ${className}`} />;
}
