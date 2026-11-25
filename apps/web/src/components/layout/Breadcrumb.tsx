import Link from "next/link";

export function Breadcrumb({ items }: { items: Array<{ href?: string; label: string }> }) {
  return (
    <p className="mb-4 text-sm text-muted">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && <span className="px-1.5">/</span>}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span className="text-ink">{item.label}</span>}
        </span>
      ))}
    </p>
  );
}
