import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Cpu, Globe, Leaf, ArrowUpRight, Quote } from "lucide-react";
import { LogoMark } from "@/components/site/Logo";
import studioImage from "@/assets/product-headphones.jpg";
import { Reveal, SectionMast } from "@/components/site/Editorial";

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
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 520px at 10% -10%, oklch(0.65 0.24 25 / 0.25), transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <LogoMark size={28} />
              <div className="mono text-accent">— Our story · Est. 2021</div>
            </div>
            <h1 className="mt-4 font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-[96px]">
              We make sound<br />feel <span className="text-accent">physical.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-border/60 bg-surface">
              <img src={studioImage} alt="PULSE over-ear headphones showcasing precision industrial design" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur-md">
                <span className="mono text-[9px] text-muted-foreground">OBJECT 03 / REFERENCE</span>
                <span className="mono text-[9px] text-accent">STOCKHOLM × BENGALURU</span>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              PULSE was founded by a small group of engineers, audiophiles and
              industrial designers obsessed with one idea: the most personal
              piece of technology you own should feel like it.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-accent-foreground"
            >
              Shop the lineup
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO / QUOTE */}
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          <div className="ed-rule items-start gap-4">
            <span className="ed-numeral text-5xl sm:text-6xl">01</span>
            <span className="mono text-[10px] uppercase tracking-[0.24em] text-accent">
              Manifesto
            </span>
          </div>
          <Reveal>
            <Quote className="h-8 w-8 text-accent" />
            <p className="mt-5 max-w-3xl font-display text-[1.9rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              We don't build gadgets. We build instruments — objects that
              disappear the moment the music starts, and reappear only when
              you notice they're beautiful.
            </p>
            <div className="mono mt-7 border-t border-border/60 pt-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Linus Okonkwo · Co-founder & head of acoustics
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionMast
            index="02"
            kicker="What we stand for"
            title={<>Four pillars.<br />No compromises.</>}
            standfirst="Every decision at PULSE routes back through these four filters — engineering rigour, recognised design, global reach and material honesty."
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Cpu, "Engineering", "8 acoustic patents and counting — from the hybrid ANC array to the titanium diaphragm."],
              [Award, "Awards", "iF Design, Red Dot and EISA recognized across three product generations."],
              [Globe, "Global", "Shipping to 40+ countries with 24-hour metro delivery in 8 cities."],
              [Leaf, "Sustainability", "100% recycled aluminium housings. Carbon neutral packaging by 2026."],
            ].map(([Ico, t, d], i) => {
              const Icon = Ico as typeof Cpu;
              return (
                <div key={t as string} className="group relative bg-background p-8 transition-colors hover:bg-card">
                  <div className="mono text-[10px] text-muted-foreground">0{i + 1}</div>
                  <Icon className="mt-4 h-6 w-6 text-accent transition-transform group-hover:scale-110" />
                  <h3 className="mt-6 font-display text-xl font-bold">{t as string}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionMast
            index="03"
            kicker="The road so far"
            title={<>Five years, three products,<br />one obsession.</>}
          />


          <ol className="mt-12 relative border-l border-border/60 pl-6 sm:pl-10">
            {[
              ["2021", "Founded in Stockholm", "A single product ships from a converted piano workshop. First 500 units sell to friends of friends."],
              ["2022", "Series 01 goes global", "Distribution opens in 18 markets. First iF Design award."],
              ["2023", "Series 02 — Sold out in 72h", "Sells out in 72 hours across 20 markets. Waitlist tops 40,000."],
              ["2024", "Studio Bengaluru", "Second design studio opens, focused on acoustics for tropical climates."],
              ["2026", "Series 03 — Transparent", "Redefines transparent design with hybrid adaptive ANC and 42-hour battery."],
            ].map(([y, t, d], i) => (
              <li key={y} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[calc(0.75rem+1px)] top-1.5 grid h-3 w-3 place-items-center sm:-left-[calc(1.25rem+1px)]">
                  <span className="h-3 w-3 rounded-full bg-accent" />
                </span>
                <div className="mono text-xs text-muted-foreground">CHAPTER {String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 flex flex-wrap items-baseline gap-4">
                  <div className="font-display text-4xl font-bold text-accent">{y}</div>
                  <div className="font-display text-2xl font-bold tracking-tight">{t}</div>
                </div>
                <p className="mt-2 max-w-xl text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1.2M", "Units shipped"],
              ["4.9★", "Customer rating"],
              ["40+", "Countries served"],
              ["72h", "Fastest sell-out"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background px-6 py-10">
                <div className="font-display text-5xl font-bold tracking-tight">{n}</div>
                <div className="mono mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden border border-border/60 bg-card p-10 sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(500px 300px at 100% 0%, oklch(0.65 0.24 25 / 0.28), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mono text-accent">— Join the labs</div>
              <h3 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                We're hiring engineers,<br />designers and audio nerds.
              </h3>
            </div>
            <Link
              to="/careers"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
            >
              See open roles
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
