import Link from "next/link";

export function SellerCallToAction() {
  return (
    <section className="mt-20 overflow-hidden rounded-[32px] bg-forest px-6 py-10 text-white md:px-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">Have something fresh to sell?</p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Grow your market value with Yucachain.</h2>
          <p className="mt-4 max-w-xl text-[#D5E4DA]">Join a marketplace built to connect fresh produce with real demand. Reach more buyers by listing your farm produce on Yucachain.</p>
          <Link href="/register?role=SELLER" className="btn-lime mt-6">
            Become a verified seller
          </Link>
        </div>
        <div className="rounded-[28px] bg-white/10 p-5">
          <p className="font-display text-3xl">Create listing</p>
          <p className="mt-2 text-sm text-[#D5E4DA]">Quantity, price, location and harvest time. Buyers on the market can add it to a cart the same day.</p>
        </div>
      </div>
    </section>
  );
}
