"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MARKET_LOCATIONS, PRODUCE_UNITS } from "@yucachain/shared";
import { Button, Input, Select } from "@/components/ui";
import { productService } from "@/services/product.service";

export default function Page() {
  const router = useRouter();
  const [produce, setProduce] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState("tonne");
  const [destination, setDestination] = useState("Abeokuta");
  const [budget, setBudget] = useState(20000);
  const [neededIn, setNeededIn] = useState("a week");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const request = await productService.createRequest({ produce, quantity, unit, destination, budget, neededIn, notes });
      router.push(`/buyer-requests/${request.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post request");
    }
  }

  return (
    <form onSubmit={submit} className="card grid max-w-3xl gap-4 p-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <h1 className="font-display text-5xl">Post a request</h1>
        <p className="mt-2 text-sm text-muted">Tell sellers the crop, quantity, destination and budget.</p>
      </div>
      <Input label="Produce" value={produce} onChange={(event) => setProduce(event.target.value)} required />
      <Input label="Quantity" type="number" min={1} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} required />
      <Select label="Unit" value={unit} onChange={(event) => setUnit(event.target.value)}>
        {PRODUCE_UNITS.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </Select>
      <Select label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)}>
        {MARKET_LOCATIONS.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </Select>
      <Input label="Budget per unit (₦)" type="number" min={1} value={budget} onChange={(event) => setBudget(Number(event.target.value))} required />
      <Input label="Needed in" value={neededIn} onChange={(event) => setNeededIn(event.target.value)} required />
      <label className="block space-y-1.5 text-sm md:col-span-2">
        <span className="font-medium">Notes</span>
        <textarea className="field min-h-24" value={notes} onChange={(event) => setNotes(event.target.value)} />
      </label>
      {error && <p className="text-sm text-clay md:col-span-2">{error}</p>}
      <div className="md:col-span-2">
        <Button>Post request</Button>
      </div>
    </form>
  );
}
