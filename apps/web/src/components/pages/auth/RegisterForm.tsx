"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { authService, homeFor, persistSession } from "@/services/auth.service";
import { RoleSelector } from "./RoleSelector";

export function RegisterForm() {
  const params = useSearchParams();
  const initial = params.get("role") === "SELLER" ? "SELLER" : "BUYER";
  const router = useRouter();
  const { refresh } = useAuth();
  const [role, setRole] = useState<"BUYER" | "SELLER">(initial);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Abeokuta");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await authService.register({ fullName, businessName: fullName, phone, password, role, location });
      persistSession(result.token, result.user.role);
      await refresh();
      router.push(homeFor(result.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Full name / Business name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="e.g Agbeloba Farms" required />
      <Input label="Phone no" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="080xxxxxxxxx" required />
      <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
      <Input label="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
      <RoleSelector value={role} onChange={setRole} />
      {error && <p className="text-sm text-clay">{error}</p>}
      <Button className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-sm text-muted">
        Already have an account? <Link href="/sign-in" className="font-semibold text-forest">Sign in</Link>
      </p>
    </form>
  );
}
