"use client";

const categories = [
  { slug: "all", label: "All produce" },
  { slug: "roots-tubers", label: "Roots & Tubers" },
  { slug: "vegetables", label: "Vegetables" },
  { slug: "fruits", label: "Fruits" },
  { slug: "grains-seeds", label: "Grains & Seeds" },
];

export function CategoryFilter({ value, onChange }: { value: string; onChange: (slug: string) => void }) {
  return (
    <div className="flex gap-2 overflow-auto pb-1">
      {categories.map((category) => (
        <button
          key={category.slug}
          type="button"
          onClick={() => onChange(category.slug)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${value === category.slug ? "bg-forest text-white" : "bg-white text-ink"}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
