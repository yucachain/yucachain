export function ProductGallery({ image, name }: { image?: string | null; name: string }) {
  return (
    <div className="card overflow-hidden">
      <img src={image || "/images/products/produce.svg"} alt={name} className="h-[420px] w-full object-cover" />
    </div>
  );
}
