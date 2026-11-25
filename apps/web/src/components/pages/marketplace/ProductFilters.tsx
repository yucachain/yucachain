"use client";

import { MARKET_LOCATIONS } from "@yucachain/shared";

export function ProductFilters({
  location,
  sort,
  onLocation,
  onSort,
}: {
  location: string;
  sort: string;
  onLocation: (value: string) => void;
  onSort: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <select className="field" value={location} onChange={(event) => onLocation(event.target.value)}>
        <option value="all">All location</option>
        {MARKET_LOCATIONS.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select className="field" value={sort} onChange={(event) => onSort(event.target.value)}>
        <option value="recent">Recently Listed</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </div>
  );
}
