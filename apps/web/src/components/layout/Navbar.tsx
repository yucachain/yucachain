"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { homeFor } from "@/services/auth.service";

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer-requests", label: "Buyer Request" },
];

export function Navbar() {
  const { user, signOut } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const sellHref = user?.role === "SELLER" ? "/seller/listings/create" : "/register?role=SELLER";

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[#F7F4EC]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo/Logo.png" alt="" className="h-9 w-9" />
          <span className="font-display text-2xl tracking-tight">Yucachain</span>
        </Link>
        <button className="btn-ghost lg:hidden" type="button" onClick={() => setOpen((value) => !value)}>
          Menu
        </button>
        <nav className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-2 border-b border-line bg-[#F7F4EC] p-4 lg:static lg:flex lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={sellHref} className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white" onClick={() => setOpen(false)}>
            Sell on Yucachain
          </Link>
          {user ? (
            <>
              {user.role === "BUYER" && (
                <Link href="/buyer/cart" className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white">
                  Cart {count > 0 ? `(${count})` : ""}
                </Link>
              )}
              <Link href={homeFor(user.role)} className="btn-primary !px-4 !py-2">
                Dashboard
              </Link>
              <button className="btn-ghost !px-4 !py-2" type="button" onClick={signOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="rounded-full px-3 py-2 text-sm font-semibold">
                Sign in
              </Link>
              <Link href="/register" className="btn-primary !px-4 !py-2">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
