"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { displayName } from "@/lib/utils";

export function DashboardHeader({ title, action }: { title: string; action?: { href: string; label: string } }) {
  const { user, signOut } = useAuth();
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-sm text-muted">{user ? displayName(user) : "Yucachain"}</p>
        <h1 className="font-display text-4xl">{title}</h1>
      </div>
      <div className="flex gap-2">
        {action && (
          <Link href={action.href} className="btn-lime">
            {action.label}
          </Link>
        )}
        <button className="btn-ghost" type="button" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
