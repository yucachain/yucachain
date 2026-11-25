import type { SelectHTMLAttributes } from "react";

export function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className="block space-y-1.5 text-sm">
      {label && <span className="font-medium text-ink">{label}</span>}
      <select className="field" {...props}>
        {children}
      </select>
    </label>
  );
}
