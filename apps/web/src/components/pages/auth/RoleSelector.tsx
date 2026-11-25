"use client";

export function RoleSelector({ value, onChange }: { value: "BUYER" | "SELLER"; onChange: (role: "BUYER" | "SELLER") => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">I want to join as</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(["SELLER", "BUYER"] as const).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${value === role ? "border-forest bg-forest text-white" : "border-line bg-white"}`}
          >
            {role === "SELLER" ? "Seller" : "Buyer"}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
