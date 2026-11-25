"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar({ items }: { items: Array<{ href: string; label: string }> }) {
  const pathname = usePathname();
  return (
    <aside className="w-full lg:w-60 lg:shrink-0">
      <nav className="flex gap-2 overflow-auto lg:grid lg:gap-1">
        {items.map((item) => {
          const childMatch = items.some(
            (other) =>
              other.href !== item.href &&
              other.href.startsWith(`${item.href}/`) &&
              (pathname === other.href || pathname.startsWith(`${other.href}/`)),
          );
          const active = pathname === item.href || (pathname.startsWith(`${item.href}/`) && !childMatch);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium lg:rounded-2xl ${active ? "bg-forest text-white" : "bg-white text-ink hover:bg-forest-soft"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
