"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MARKET_LOCATIONS, PRODUCE_UNITS } from "@yucachain/shared";
import { Button, Input, Select } from "@/components/ui";
import { productService, type ListingInput } from "@/services/product.service";

const categories = [
  { slug: "roots-tubers", label: "Roots & Tubers" },
  { slug: "vegetables", label: "Vegetables" },
  { slug: "fruits", label: "Fruits" },
  { slug: "grains-seeds", label: "Grains & Seeds" },
];

export function CreateListingForm({ initial, productId }: { initial?: Partial<ListingInput>; productId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ListingInput>({
    name: initial?.name || "",
    categorySlug: initial?.categorySlug || "roots-tubers",
    description: initial?.description || "",
    price: initial?.price || 0,
    unit: initial?.unit || "bag",
    quantity: initial?.quantity || 1,
    location: initial?.location || "Abeokuta",
    harvestTime: initial?.harvestTime || "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function set<K extends keyof ListingInput>(key: K, value: ListingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      if (productId) await productService.update(productId, form);
      else await productService.create(form);
      router.push("/seller/listings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save listing");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-5 md:grid-cols-2">
      <Input label="Produce" value={form.name} onChange={(event) => set("name", event.target.value)} required />
      <Select label="Category" value={form.categorySlug} onChange={(event) => set("categorySlug", event.target.value)}>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.label}
          </option>
        ))}
      </Select>
      <Input label="Price (₦)" type="number" min={1} value={form.price || ""} onChange={(event) => set("price", Number(event.target.value))} required />
      <Select label="Unit" value={form.unit} onChange={(event) => set("unit", event.target.value)}>
        {PRODUCE_UNITS.map((unit) => (
          <option key={unit}>{unit}</option>
        ))}
      </Select>
      <Input label="Quantity available" type="number" min={0} value={form.quantity} onChange={(event) => set("quantity", Number(event.target.value))} required />
      <Select label="Location" value={form.location} onChange={(event) => set("location", event.target.value)}>
        {MARKET_LOCATIONS.map((location) => (
          <option key={location}>{location}</option>
        ))}
      </Select>
      <Input label="Harvest time" value={form.harvestTime} onChange={(event) => set("harvestTime", event.target.value)} placeholder="Today" />
      <label className="block space-y-1.5 text-sm md:col-span-2">
        <span className="font-medium">Description</span>
        <textarea className="field min-h-28" value={form.description} onChange={(event) => set("description", event.target.value)} />
      </label>
      {error && <p className="text-sm text-clay md:col-span-2">{error}</p>}
      <div className="md:col-span-2">
        <Button disabled={pending}>{pending ? "Saving…" : productId ? "Save listing" : "Create listing"}</Button>
      </div>
    </form>
  );
}
