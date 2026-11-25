"use client";

import { MARKET_LOCATIONS } from "@yucachain/shared";

export function RequestFilters({
  q,
  location,
  onQuery,
  onLocation,
}: {
  q: string;
  location: string;
  onQuery: (value: string) => void;
  onLocation: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-[1.4fr_0.6fr]">
      <input className="field" placeholder="Search cassava, onions, plantain..." value={q} onChange={(event) => onQuery(event.target.value)} />
      <select className="field" value={location} onChange={(event) => onLocation(event.target.value)}>
        <option value="all">All location</option>
        {MARKET_LOCATIONS.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
