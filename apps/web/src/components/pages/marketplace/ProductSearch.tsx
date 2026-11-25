"use client";

export function ProductSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      className="field"
      placeholder="Search Cassava, tomatoes, onion, maize....."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
