const notes = [
  { name: "Pee5ive Harvest", place: "Abeokuta", text: "Cassava, carrots, tomatoes and peppers listed with harvest-day availability." },
  { name: "EasyNation Foods", place: "Ilorin", text: "Sourcing 10 tonnes of fresh cassava with delivery inside 7 days." },
  { name: "Drevo Farms", place: "Abeokuta", text: "Cassava, yam and maize prepared for dispatch within 24 hours of harvest." },
];

export function Testimonials() {
  return (
    <section className="mt-20">
      <p className="eyebrow">Across the value chain</p>
      <h2 className="mt-2 font-display text-4xl">Farms and buyers already on the feed</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {notes.map((note) => (
          <blockquote key={note.name} className="card p-5">
            <p className="text-sm leading-relaxed">{note.text}</p>
            <footer className="mt-4 text-sm font-semibold">
              {note.name}
              <span className="font-normal text-muted"> · {note.place}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
