import Link from "next/link";
import type { PublicUser } from "@yucachain/shared";
import { displayName, initials } from "@/lib/utils";

export function SellerWelcome({ profile }: { profile: PublicUser }) {
  const name = displayName(profile);
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-lime font-display text-2xl text-forest-dark">{initials(name)}</div>
        <div>
          <h1 className="font-display text-4xl">{name}</h1>
          <p className="text-sm text-muted">
            {profile.location} · Seller {profile.verified ? "· Verified" : ""}
          </p>
          <p className="mt-2 max-w-xl text-sm">{profile.bio}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link href="/seller/profile" className="btn-ghost">Edit Profile</Link>
        <Link href="/seller/listings/create" className="btn-primary">Post Listing</Link>
      </div>
    </div>
  );
}
