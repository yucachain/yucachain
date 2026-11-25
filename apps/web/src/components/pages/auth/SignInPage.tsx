import { SignInForm } from "./SignInForm";

export function SignInPage() {
  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] border border-line bg-card shadow-card lg:grid-cols-2">
      <div className="bg-forest p-8 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-lime">Yucachain</p>
        <h1 className="mt-4 font-display text-5xl">Sign in to your account</h1>
        <p className="mt-4 text-[#D5E4DA]">Sign in to connect with farmers, suppliers and buyers.</p>
      </div>
      <div className="p-8">
        <SignInForm />
      </div>
    </div>
  );
}
