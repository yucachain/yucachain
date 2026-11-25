"use client";

import { useEffect, useState } from "react";
import type { PublicUser } from "@yucachain/shared";
import { Badge, Button } from "@/components/ui";
import { authService } from "@/services/auth.service";

export function UserManagementPage() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setUsers(await authService.users());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load users");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle(user: PublicUser) {
    if (user.role === "ADMIN") return;
    await authService.setStatus(user.id, user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE");
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">Users</h1>
      {error && <p className="text-clay">{error}</p>}
      {users.map((user) => (
        <article key={user.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="font-semibold">{user.businessName || user.fullName}</p>
            <p className="text-sm text-muted">{user.phone} · {user.role} · {user.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={user.status === "ACTIVE" ? "green" : "clay"}>{user.status}</Badge>
            {user.role !== "ADMIN" && (
              <Button variant="ghost" type="button" onClick={() => toggle(user)}>
                {user.status === "ACTIVE" ? "Suspend" : "Restore"}
              </Button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
