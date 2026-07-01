import { createFileRoute } from "@tanstack/react-router";
import { Award, Cpu, Globe, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PULSE" },
      { name: "description", content: "PULSE Audio Labs designs premium wireless earbuds engineered for sound purists." },
      { property: "og:title", content: "About — PULSE" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="mono text-accent">— Our story</div>
      <h1 className="mt-3 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
        We build sound<br />you can almost touch.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        PULSE was founded in 2021 by a small group of engineers, audiophiles and
        industrial designers obsessed with one idea: the most personal piece of
        technology you own should feel like it. Today we ship to 40+ countries.
      </p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [Cpu, "Engineering", "8 acoustic patents and counting."],
          [Award, "Awards", "iF Design, Red Dot, EISA recognized."],
          [Globe, "Global", "Shipping to 40+ countries worldwide."],
          [Leaf, "Sustainability", "Carbon neutral packaging by 2026."],
        ].map(([Ico, t, d]) => {
          const Icon = Ico as typeof Cpu;
          return (
            <div key={t as string} className="rounded-2xl border border-border/60 bg-card p-6">
              <Icon className="h-5 w-5 text-accent" />
              <h3 className="mt-4 font-display text-lg font-bold">{t as string}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-3">
        {[
          ["2021", "Founded in Stockholm with a single product and a big idea."],
          ["2023", "Series 02 ships — sells out in 72 hours across 20 markets."],
          ["2026", "Series 03 redefines transparent design with hybrid adaptive ANC."],
        ].map(([y, t]) => (
          <div key={y} className="border-l border-border/60 pl-6">
            <div className="font-display text-3xl font-bold text-accent">{y}</div>
            <p className="mt-2 text-muted-foreground">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
