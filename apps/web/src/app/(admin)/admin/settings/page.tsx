"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { authService } from "@/services/auth.service";

export default function Page() {
  const [commissionRate, setCommissionRate] = useState("5");
  const [platformName, setPlatformName] = useState("Yucachain");
  const [supportEmail, setSupportEmail] = useState("support@yucachain.ng");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    authService.settings().then((settings) => {
      setCommissionRate(String(settings.commissionRate * 100));
      setPlatformName(settings.platformName);
      setSupportEmail(settings.supportEmail);
    });
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await authService.updateSettings({
        commissionRate: Number(commissionRate) / 100,
        platformName,
        supportEmail,
      });
      setNotice("Settings saved. New orders use this commission rate.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings");
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-xl space-y-4 p-5">
      <h1 className="font-display text-5xl">Settings</h1>
      <Input label="Commission rate (%)" type="number" min={0} max={30} step="0.1" value={commissionRate} onChange={(event) => setCommissionRate(event.target.value)} />
      <Input label="Platform name" value={platformName} onChange={(event) => setPlatformName(event.target.value)} />
      <Input label="Support email" type="email" value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} />
      {notice && <p className="text-sm text-forest">{notice}</p>}
      {error && <p className="text-sm text-clay">{error}</p>}
      <Button>Save settings</Button>
    </form>
  );
}
