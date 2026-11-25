"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

const items = [
  { href: "/seller/dashboard", label: "Dashboard" },
  { href: "/seller/listings", label: "Listings" },
  { href: "/seller/orders", label: "Orders" },
  { href: "/seller/sales", label: "Sales" },
  { href: "/seller/payouts", label: "Payouts" },
  { href: "/seller/profile", label: "Profile" },
  { href: "/seller/profile/bank-details", label: "Bank details" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
      <DashboardSidebar items={items} />
      <div>{children}</div>
    </div>
  );
}
