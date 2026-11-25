import type { InputHTMLAttributes } from "react";

export function Input({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block space-y-1.5 text-sm">
      {label && <span className="font-medium text-ink">{label}</span>}
      <input className="field" {...props} />
    </label>
  );
}
