"use client";

export function QuantitySelector({ value, max, onChange }: { value: number; max: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button className="px-4 py-2" type="button" onClick={() => onChange(Math.max(1, value - 1))}>
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold">{value}</span>
      <button className="px-4 py-2" type="button" onClick={() => onChange(Math.min(max, value + 1))}>
        +
      </button>
    </div>
  );
}
