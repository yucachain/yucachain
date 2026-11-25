import { Suspense } from "react";
import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] border border-line bg-card shadow-card lg:grid-cols-2">
      <div className="bg-[#E7F0E4] p-8">
        <p className="eyebrow">Join the market</p>
        <h1 className="mt-3 font-display text-5xl">Create your account</h1>
        <p className="mt-4 text-muted">Join Nigeria’s agricultural marketplace as a buyer or seller.</p>
      </div>
      <div className="p-8">
        <Suspense fallback={<p>Loading form…</p>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
