import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Cpu, Globe, Leaf, Headphones, Heart, Radio, Sparkles, Users, Building2, Rocket, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PULSE" },
      { name: "description", content: "PULSE Audio Labs designs premium wireless earbuds and headphones engineered for sound purists across 40+ countries." },
      { property: "og:title", content: "About — PULSE" },
      { property: "og:description", content: "Meet the team crafting sound you can almost touch." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const STATS: [string, string][] = [
  ["4M+", "Listeners worldwide"],
  ["40+", "Countries shipped"],
  ["8", "Acoustic patents"],
  ["4.8★", "Average rating"],
];

const PILLARS = [
  [Cpu, "Engineering", "8 acoustic patents. In-house DSP. Custom 11mm bio-cellulose drivers tuned by ex-Sennheiser engineers."],
  [Award, "Awards", "iF Design 2024, Red Dot Best-of-Best, EISA Product of the Year — three years running."],
  [Globe, "Global", "Warehouses in Bengaluru, Rotterdam and Austin. 40+ markets. 3-day delivery to metros."],
  [Leaf, "Sustainability", "100% recycled aluminium chassis. FSC-certified packaging. Carbon-neutral shipping by 2026."],
] as const;

const TIMELINE: [string, string, string][] = [
  ["2021", "Founded", "Two ex-Sennheiser engineers and a designer meet in a Stockholm garage. Series 01 ships six months later."],
  ["2022", "India-first", "Bengaluru HQ opens. Local tuning for Indian ears — warmer mids, punchier low-end."],
  ["2023", "Series 02", "72-hour sellout across 20 markets. Featured in WIRED, GQ, T3."],
  ["2024", "Studio Line", "Reference-grade headphones for producers. Endorsed by 400+ studios worldwide."],
  ["2025", "Sport & Gaming", "PulseFit and PulseArena launch — 8-hour ANC, 30ms latency."],
  ["2026", "Series 03", "Transparent design meets hybrid adaptive ANC. Available in six markets today."],
];

const VALUES = [
  [Heart, "People first", "Every headphone is tested on real ears — not just anechoic chambers."],
  [Radio, "Sound honesty", "Neutral by default. Signature mode by choice. Never marketing-driven EQ."],
  [Sparkles, "Craft obsession", "3,200 hours of tuning before a driver ships. No exceptions."],
  [ShieldCheck, "Trust", "Two-year global warranty, no-question 30-day returns, lifetime firmware."],
] as const;

const TEAM = [
  ["Astrid Lindqvist", "Co-founder · CEO", "Ex-Sennheiser R&D. 12 years in transducer design."],
  ["Rohan Iyer", "Co-founder · CTO", "Ex-Sonos DSP lead. Built the PulseCore acoustic engine."],
  ["Mira Chen", "Head of Design", "iF Gold, Red Dot. Believes hardware should feel like a keepsake."],
];

function About() {
  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 500px at 50% -10%, oklch(0.65 0.24 25 / 0.22), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
          <div className="mono text-accent">— Our story</div>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            We build sound<br />
            <span className="shimmer-text">you can almost touch.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            PULSE was founded in 2021 by a small group of engineers, audiophiles and
            industrial designers obsessed with one idea: the most personal piece of
            technology you own should feel like it. Today we ship to 40+ countries and
            we're still tuning every driver by ear.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30"
            >
              <Headphones className="h-4 w-4" /> Explore the range
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Talk to the team →
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map(([v, l]) => (
              <div
                key={l}
                className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur"
              >
                <div className="font-display text-3xl font-bold tracking-tight text-accent sm:text-4xl">{v}</div>
                <div className="mono mt-1 text-[11px] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <div className="mono text-accent">— Mission</div>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Sound engineered for the human ear — not the spec sheet.
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-8 text-muted-foreground">
            <p>
              A great pair of headphones disappears. The world stays. The music, the
              caller, the silence — all where they belong. That's the only test we care
              about.
            </p>
            <p>
              We build the drivers, the DSP and the app under one roof so nothing is
              lost in translation. Every PULSE product ships with a signed acoustic
              certificate from the engineer who tuned it.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(([Ico, t, d]) => {
            const Icon = Ico as typeof Cpu;
            return (
              <div
                key={t}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mono text-accent">— Milestones</div>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Five years, six chapters.</h2>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-accent via-border/60 to-transparent sm:left-1/2"
          />
          <div className="space-y-8">
            {TIMELINE.map(([y, h, t], i) => (
              <div
                key={y}
                className={`relative grid gap-4 sm:grid-cols-2 sm:gap-10 ${
                  i % 2 ? "sm:[&>*:first-child]:col-start-2" : ""
                }`}
              >
                <div className="pl-10 sm:pl-0">
                  <span
                    aria-hidden
                    className="absolute left-1 top-2 grid h-5 w-5 place-items-center rounded-full border-2 border-background bg-accent sm:left-1/2 sm:-ml-2.5"
                  />
                  <div className="rounded-2xl border border-border/60 bg-card p-5">
                    <div className="font-display text-3xl font-bold text-accent">{y}</div>
                    <h3 className="mt-1 font-display text-lg font-bold">{h}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mono text-accent">— Values</div>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">What we don't compromise on.</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {VALUES.map(([Ico, t, d]) => {
            const Icon = Ico as typeof Heart;
            return (
              <div key={t} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mono text-accent">— Leadership</div>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">The people behind PULSE.</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {TEAM.map(([n, r, b]) => (
            <div key={n} className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div
                aria-hidden
                className="grid h-16 w-16 place-items-center rounded-full text-2xl font-bold text-accent-foreground"
                style={{ background: "linear-gradient(135deg, oklch(0.65 0.24 25), oklch(0.55 0.24 25))" }}
              >
                {n.split(" ").map((s) => s[0]).join("")}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{n}</h3>
              <div className="mono text-[11px] text-accent">{r}</div>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(600px 300px at 80% 20%, oklch(0.65 0.24 25 / 0.25), transparent 60%), radial-gradient(600px 300px at 10% 100%, oklch(0.6 0.2 260 / 0.18), transparent 60%)",
            }}
          />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="mono text-accent">— Come build with us</div>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                Careers, press, partnerships.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Whether you're a producer, a retailer, or a designer looking to join —
                we'd love to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/careers" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"><Users className="h-4 w-4" /> Careers</Link>
              <Link to="/press" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-3 text-sm font-semibold"><Building2 className="h-4 w-4" /> Press kit</Link>
              <Link to="/affiliates" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-3 text-sm font-semibold"><Rocket className="h-4 w-4" /> Affiliates</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
