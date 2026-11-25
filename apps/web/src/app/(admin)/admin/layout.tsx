"use client";

import Link from "next/link";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
      <div>
        <AdminSidebar />
        <div className="mt-3 flex gap-2">
          <Link href="/" className="btn-ghost">Market</Link>
          <button className="btn-ghost" type="button" onClick={signOut}>Sign out</button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
