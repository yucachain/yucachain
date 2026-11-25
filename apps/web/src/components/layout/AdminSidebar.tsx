"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Dashboard", "/admin/dashboard"],
  ["Users", "/admin/users"],
  ["Farmers", "/admin/farmers"],
  ["Buyers", "/admin/buyers"],
  ["Products", "/admin/products"],
  ["Orders", "/admin/orders"],
  ["Payments", "/admin/payments"],
  ["Commissions", "/admin/commissions"],
  ["Payouts", "/admin/payouts"],
  ["Bank accounts", "/admin/bank-accounts"],
  ["Settings", "/admin/settings"],
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full rounded-[28px] bg-forest-dark p-3 text-white lg:w-60 lg:shrink-0">
      <p className="px-3 py-2 font-display text-2xl">Admin</p>
      <nav className="mt-2 flex gap-2 overflow-auto lg:grid">
        {items.map(([label, href]) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`whitespace-nowrap rounded-2xl px-3 py-2 text-sm ${active ? "bg-lime text-forest-dark" : "text-[#D5E4DA] hover:bg-white/10"}`}>
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
