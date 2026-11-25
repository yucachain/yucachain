import Link from "next/link";

export function Footer() {
  return (
    <footer id="legal" className="mt-20 border-t border-line bg-[#10281E] text-[#E7F0E4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <img src="/images/logo/Logo.png" alt="" className="h-9 w-9 rounded-full bg-lime" />
            <span className="font-display text-3xl text-white">Yucachain</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-[#C9D7CE]">Agricultural Technology Company.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">Features</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/register?role=SELLER">Seller Onboarding</Link>
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/buyer-requests">Buyer Requests</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">Support</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/#how-it-works">Help</Link>
            <Link href="/#how-it-works">FAQ</Link>
            <a href="mailto:support@yucachain.ng">Contacts</a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-[#C9D7CE]">
            <p>Privacy Policy — trade records stay with the accounts that created them.</p>
            <p>Terms of services — listings, requests and payouts run through Yucachain.</p>
            <p>Cookies — a session cookie keeps you signed in.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
