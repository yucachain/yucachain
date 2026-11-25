"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth.service";

export function SellerProfilePage() {
  const { user, refresh } = useAuth();
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!user) return;
    setFullName(user.fullName);
    setBusinessName(user.businessName || "");
    setLocation(user.location || "");
    setBio(user.bio || "");
  }, [user]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    await authService.updateProfile({ fullName, businessName, location, bio });
    await refresh();
    setNotice("Profile saved.");
  }

  return (
    <form onSubmit={submit} className="card max-w-2xl space-y-4 p-5">
      <h1 className="font-display text-4xl">Profile</h1>
      <Input label="Full name" value={fullName} onChange={(event) => setFullName(event.target.value)} />
      <Input label="Business name" value={businessName} onChange={(event) => setBusinessName(event.target.value)} />
      <Input label="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
      <label className="block space-y-1.5 text-sm">
        <span className="font-medium">Bio</span>
        <textarea className="field min-h-28" value={bio} onChange={(event) => setBio(event.target.value)} />
      </label>
      {notice && <p className="text-sm text-forest">{notice}</p>}
      <Button>Save profile</Button>
    </form>
  );
}
