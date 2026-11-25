import { CreateListingForm } from "./CreateListingForm";

export function CreateListingPage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="eyebrow">New listing</p>
        <h1 className="font-display text-5xl">Post produce</h1>
        <p className="mt-2 text-muted">Sellers list produce with quantity, price and freshness.</p>
      </div>
      <CreateListingForm />
    </div>
  );
}
