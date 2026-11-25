const steps = [
  {
    title: "Post",
    body: "Sellers list produce with quantity, price and freshness. Buyers post what they need and their budget.",
  },
  {
    title: "Aggregate",
    body: "Connecting agricultural producers, suppliers and buyers through stronger supply chains and better market access.",
  },
  {
    title: "Trade",
    body: "Agree terms, deliver, and build a rating on your profile.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mt-24">
      <p className="eyebrow">How the market moves</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="card p-6">
            <p className="font-display text-5xl text-forest/20">0{index + 1}</p>
            <h2 className="mt-2 font-display text-4xl">{step.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
