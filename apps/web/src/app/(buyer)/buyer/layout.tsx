"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

const items = [
  { href: "/buyer/dashboard", label: "Dashboard" },
  { href: "/buyer/cart", label: "Cart" },
  { href: "/buyer/orders", label: "Orders" },
  { href: "/buyer/requests", label: "Requests" },
  { href: "/buyer/profile", label: "Profile" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
      <DashboardSidebar items={items} />
      <div>{children}</div>
    </div>
  );
}
