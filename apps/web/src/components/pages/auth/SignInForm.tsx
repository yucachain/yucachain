"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { DEMO_ACCOUNTS } from "@/lib/constants";
import { authService, homeFor, persistSession } from "@/services/auth.service";

export function SignInForm() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await authService.login(phone, password);
      persistSession(result.token, result.user.role);
      await refresh();
      router.push(homeFor(result.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Phone no" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="080xxxxxxxxx" required />
      <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      {error && <p className="text-sm text-clay">{error}</p>}
      <Button className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-sm text-muted">
        New to YucaChain? <Link href="/register" className="font-semibold text-forest">Create an account</Link>
      </p>
      <div className="rounded-2xl bg-paper p-3 text-xs text-muted">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.phone}
            type="button"
            className="block w-full py-1 text-left hover:text-ink"
            onClick={() => {
              setPhone(account.phone);
              setPassword(account.password);
            }}
          >
            {account.role}: {account.name} · {account.phone}
          </button>
        ))}
      </div>
    </form>
  );
}
