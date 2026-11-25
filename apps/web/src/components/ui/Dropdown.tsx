"use client";

import { useState } from "react";

export function Dropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; onClick: () => void }>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button className="btn-ghost !px-3 !py-2" type="button" onClick={() => setOpen((value) => !value)}>
        {label}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 min-w-40 rounded-2xl border border-line bg-card p-1 shadow-card">
          {items.map((item) => (
            <button
              key={item.label}
              className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-paper"
              type="button"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
