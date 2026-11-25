import Link from "next/link";

export function HeroSection() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="eyebrow">Ogun State · Open agricultural market</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.98] text-ink md:text-7xl">
          Transforming Agricultural Trade in Ogun State
        </h1>
        <p className="mt-4 font-display text-2xl text-forest md:text-3xl">Through Better Connections and Open Markets.</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          Connecting farmers, suppliers and buyers through a unified agricultural marketplace that makes trading easier, improves access to markets and creates better opportunities for everyone across Ogun State&apos;s agricultural value chain.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/marketplace" className="btn-primary">
            Explore the market
          </Link>
          <Link href="/register?role=SELLER" className="btn-lime">
            Become a seller
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="card rotate-[-2deg] p-4">
          <img src="/images/products/cassava.jpg" alt="Cassava bundles" className="h-52 w-full rounded-2xl object-cover" />
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-mid">Abeokuta</p>
              <p className="font-display text-3xl">Fresh Cassava</p>
            </div>
            <p className="font-semibold">₦23,000</p>
          </div>
        </div>
        <div className="card absolute -bottom-8 -left-4 hidden w-56 p-3 md:block">
          <p className="text-xs text-muted">Verified seller</p>
          <p className="font-medium">Pee5ive Harvest</p>
          <p className="text-sm text-muted">1,000 bundles available</p>
        </div>
      </div>
    </section>
  );
}
