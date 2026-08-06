import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Headphones, Play, Quote, Shield, Sparkles, Star, Truck, Zap } from "lucide-react";
import hero from "@/assets/hero-earbuds.jpg";
import { PRODUCTS, CATEGORIES, BRANDS } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { brandLogo } from "@/lib/brand-logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PULSE — Experience Sound Beyond Reality" },
      {
        name: "description",
        content:
          "Premium wireless earbuds, ANC headphones, gaming and sports audio — cinematic sound and luxury design from PULSE.",
      },
      { property: "og:title", content: "PULSE — Experience Sound Beyond Reality" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const [listeners, setListeners] = useState(12480);
  useEffect(() => {
    const id = setInterval(() => setListeners((n) => n + Math.floor(Math.random() * 7) - 2), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" aria-hidden />
        {/* animated red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/4 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
        />

        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-16 pt-28 sm:px-6 md:grid-cols-12 md:gap-12 md:pt-24">
          {/* Left copy */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="rise flex items-center gap-2">
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> New Series 03
              </span>
              <span className="mono text-muted-foreground">/ 2026 LINEUP</span>
            </div>
            <h1 className="rise mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Sound{" "}
              <span className="shimmer-text">beyond</span>
              <br />
              reality.
            </h1>
            <p className="rise mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
              Cinematic audio, hybrid adaptive ANC and a transparent design philosophy.
              Engineered for music, calls, gaming and everyday luxury.
            </p>

            <div className="rise mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="btn-magnetic group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-magnetic inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-semibold">
                <Play className="h-3.5 w-3.5 fill-current" /> Watch Demo
              </button>
              <div className="ml-2 flex items-center gap-0.5" aria-hidden>
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
              </div>
            </div>

            {/* live listeners */}
            <div className="rise mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="mono text-muted-foreground">LIVE</span>
              <span className="font-semibold tabular-nums">{listeners.toLocaleString()}</span>
              <span className="text-muted-foreground">tuned in right now</span>
            </div>

            {/* meta strip */}
            <dl className="rise mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6 text-xs">
              {[
                ["−45dB", "Hybrid ANC"],
                ["40h", "Total Battery"],
                ["55ms", "Game Mode"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-xl font-bold">{k}</dt>
                  <dd className="mono text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right hero image */}
          <div className="relative md:col-span-6 lg:col-span-7">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl sm:h-[420px] sm:w-[420px]"
              style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
            />
            <div className="float-y relative mx-auto aspect-square w-full max-w-xl">
              <img
                src={hero}
                alt="Premium wireless earbuds with transparent design and charging case"
                width={1600}
                height={1200}
                className="h-full w-full object-contain drop-shadow-[0_30px_80px_oklch(0.65_0.24_25_/_0.45)]"
              />
              {/* Pulse ring */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
              />
              <div
                aria-hidden
                className="pulse-ring pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60"
              />
            </div>

            {/* Floating spec chips */}
            <div className="absolute -left-2 top-12 hidden md:block">
              <SpecChip label="Driver" value="11mm" />
            </div>
            <div className="absolute right-0 top-1/3 hidden md:block">
              <SpecChip label="Codec" value="LDAC" />
            </div>
            <div className="absolute bottom-12 left-10 hidden md:block">
              <SpecChip label="ANC" value="−45dB" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#categories"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
          aria-label="Scroll"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* MARQUEE */}
      <section className="relative border-y border-border/60 bg-surface py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent"
        />
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <Link
                to="/shop"
                search={{ brand: b }}
                key={`${b}-${i}`}
                className="group inline-flex items-center gap-3 whitespace-nowrap text-muted-foreground transition-colors hover:text-accent"
                title={b}
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-black/5 transition-transform group-hover:scale-110">
                  <img
                    src={brandLogo(b)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="mono text-sm">{b.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-72 opacity-60"
          style={{
            background:
              "radial-gradient(650px 260px at 20% 0%, oklch(0.65 0.24 25 / 0.16), transparent 70%)",
          }}
        />
        <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <div className="mono text-accent">— Collections</div>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Find your sound.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              {PRODUCTS.length} hand-tuned products across {CATEGORIES.length} collections —
              from reference studio cans to featherweight open-ear runners.
            </p>
          </div>
          <Link
            to="/shop"
            className="mono hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-[11px] transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            VIEW ALL <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <FindYourSound />


        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-surface-2/40 p-5">
          <div>
            <div className="font-display text-lg font-bold">Not sure which is right for you?</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Put any two products side by side — drivers, ANC depth, battery, latency and price.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/compare"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Compare products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-accent hover:text-accent"
            >
              Browse all {PRODUCTS.length}
            </Link>
          </div>
        </div>

      </section>


      {/* TRENDING */}
      <TrendingNow />


      {/* FEATURE STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Zap, "Adaptive ANC", "Hybrid 6-mic system cancels up to 45dB across 240 environments."],
            [Sparkles, "Spatial Audio", "Head-tracked 360° immersion engineered for cinematic music."],
            [Headphones, "Hi-Res Wireless", "LDAC + LHDC certified for studio-grade detail wherever you go."],
            [Truck, "Lightning Delivery", "Free same-day in metros · 30-day returns · 2-year warranty."],
          ].map(([Ico, t, d]) => {
            const Icon = Ico as typeof Zap;
            return (
              <div key={t as string} className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEW LAUNCH BANNER */}
      {newArrivals.length > 0 && (
        <section className="relative overflow-hidden bg-surface">
          <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
          <div
            aria-hidden
            className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono text-accent">— New launch</span>
                <span className="mono inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[9px] tracking-[0.18em] text-accent">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {newArrivals.length} JUST DROPPED
                </span>
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
                Made to be<br />heard, not seen.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                The new Series 03 pushes acoustic design into transparent territory.
                Smaller. Lighter. Astonishingly loud.
              </p>

              <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-border/60 py-5 text-xs">
                {[
                  [`₹${Math.min(...newArrivals.map((p) => p.price)).toLocaleString("en-IN")}`, "Launch price from"],
                  [
                    (newArrivals.reduce((s, p) => s + p.rating, 0) / newArrivals.length).toFixed(1),
                    "Early review avg",
                  ],
                  ["48h", "Priority dispatch"],
                ].map(([k, v]) => (
                  <div key={v}>
                    <dt className="font-display text-xl font-bold">{k}</dt>
                    <dd className="mono text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
                {[
                  "Launch-window pricing, locked for the first 14 days",
                  "Free engraving + 2 extra ear-tip sizes in the box",
                  "Extended 3-year warranty on every launch unit",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {l}
                  </li>
                ))}
              </ul>

              <Link
                to="/shop"
                className="btn-magnetic mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
              >
                Explore new arrivals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {newArrivals.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 300px at 20% 30%, oklch(0.65 0.24 25 / 0.15), transparent 70%), radial-gradient(500px 250px at 85% 70%, oklch(0.65 0.24 25 / 0.10), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mono text-accent">— Loud opinions</div>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Heard by half a million.
              </h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="mono text-xs text-muted-foreground">4.9 · 42,318 reviews</span>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                q: "The ANC is unreal. It's the first time a commute felt like a studio session.",
                a: "Ananya S.",
                r: "Product Designer · Bangalore",
              },
              {
                q: "Bass hits like a live gig. I gave away my old cans the same week.",
                a: "Marcus L.",
                r: "Music Producer · Berlin",
              },
              {
                q: "40h battery is not a spec sheet lie. I forgot my charger for a whole trip.",
                a: "Priya K.",
                r: "Travel Writer · Mumbai",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50"
              >
                <Quote className="h-6 w-6 text-accent/60" />
                <blockquote className="mt-4 font-display text-lg leading-snug">"{t.q}"</blockquote>
                <figcaption className="mono mt-6 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t.a}</span> · {t.r}
                </figcaption>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
                />
              </figure>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            {[
              ["500k+", "Happy listeners"],
              ["4.9★", "Average rating"],
              ["2 yr", "Warranty"],
              ["30 day", "Returns"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border/60 bg-card px-5 py-4 text-center">
                <div className="font-display text-2xl font-bold sm:text-3xl">{k}</div>
                <div className="mono mt-1 text-[10px] text-muted-foreground">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl border-t border-border/60 px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> 2-year warranty</div>
          <div className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Free shipping over ₹999</div>
          <div className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Lifetime support</div>
          <div className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> 30-day no-questions returns</div>
        </div>
      </section>
    </div>
  );
}

function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-4 py-2.5">
      <div className="mono text-[10px] text-muted-foreground">{label}</div>
      <div className="font-display text-lg font-bold leading-none">{value}</div>
    </div>
  );
}

/** Use-case lenses — each one is a real predicate over the catalogue. */
const USE_CASES = [
  {
    key: "all",
    label: "Everything",
    blurb: "The full catalogue, every collection.",
    match: () => true,
  },
  {
    key: "commute",
    label: "Silence the commute",
    blurb: "Deep active noise cancellation for flights, metros and open offices.",
    match: (p: (typeof PRODUCTS)[number]) => p.anc,
  },
  {
    key: "gaming",
    label: "Zero-lag gaming",
    blurb: "Low-latency links and positional audio for competitive play.",
    match: (p: (typeof PRODUCTS)[number]) => p.category === "gaming",
  },
  {
    key: "sports",
    label: "Run & sweat",
    blurb: "Secure fits with sweat and rain resistance for training.",
    match: (p: (typeof PRODUCTS)[number]) => p.category === "sports",
  },
  {
    key: "studio",
    label: "Studio reference",
    blurb: "Flat, honest tuning for mixing and critical listening.",
    match: (p: (typeof PRODUCTS)[number]) =>
      p.category === "studio" || p.category === "flagship",
  },
  {
    key: "calls",
    label: "All-day calls",
    blurb: "Clear mics and multipoint pairing for back-to-back meetings.",
    match: (p: (typeof PRODUCTS)[number]) =>
      p.category === "business" || p.category === "tws",
  },
  {
    key: "value",
    label: "Under ₹5,000",
    blurb: "Everything great that stays comfortably under five thousand.",
    match: (p: (typeof PRODUCTS)[number]) => p.price <= 5000,
  },
] as const;

function FindYourSound() {
  const [lens, setLens] = useState<(typeof USE_CASES)[number]["key"]>("all");
  const active = USE_CASES.find((u) => u.key === lens) ?? USE_CASES[0];
  const pool = PRODUCTS.filter(active.match);

  const cats = CATEGORIES.map((c) => {
    const inCat = pool.filter((p) => p.category === c.slug);
    return { c, inCat };
  }).filter((x) => x.inCat.length > 0);

  // Accurate, mutually-exclusive recommendation labels for this lens.
  const bestValue = pool.reduce<(typeof PRODUCTS)[number] | undefined>(
    (b, p) => (!b || p.price < b.price ? p : b),
    undefined,
  );
  const topRated = pool.reduce<(typeof PRODUCTS)[number] | undefined>(
    (b, p) => (!b || p.rating > b.rating ? p : b),
    undefined,
  );
  const mostReviewed = pool.reduce<(typeof PRODUCTS)[number] | undefined>(
    (b, p) => (!b || p.reviews > b.reviews ? p : b),
    undefined,
  );

  return (
    <div>
      {/* Use-case lenses */}
      <div className="-mx-4 mb-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {USE_CASES.map((u) => {
          const count = u.key === "all" ? PRODUCTS.length : PRODUCTS.filter(u.match).length;
          const on = lens === u.key;
          return (
            <button
              key={u.key}
              type="button"
              aria-pressed={on}
              onClick={() => setLens(u.key)}
              className={`mono shrink-0 snap-start rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.14em] transition-all ${
                on
                  ? "border-accent bg-accent text-accent-foreground shadow-[0_10px_30px_-16px_oklch(0.65_0.24_25/0.9)]"
                  : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              }`}
            >
              {u.label}
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] ${
                  on ? "bg-background/25" : "bg-surface-2"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{pool.length} products</span> match “
        {active.label}” · {active.blurb}
      </p>

      {/* Recommendation rail */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { pick: topRated, tag: "Highest rated", note: (p: (typeof PRODUCTS)[number]) => `${p.rating.toFixed(1)}★ from ${p.reviews.toLocaleString("en-IN")} reviews` },
          { pick: bestValue, tag: "Lowest price", note: (p: (typeof PRODUCTS)[number]) => `₹${p.price.toLocaleString("en-IN")} · ${p.discount}% off MRP` },
          { pick: mostReviewed, tag: "Most reviewed", note: (p: (typeof PRODUCTS)[number]) => `${p.reviews.toLocaleString("en-IN")} verified buyers` },
        ].map(
          ({ pick, tag, note }) =>
            pick && (
              <Link
                key={tag}
                to="/product/$id"
                params={{ id: String(pick.id) }}
                className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-accent/60"
              >
                <img
                  src={pick.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <span className="min-w-0">
                  <span className="mono block text-[9px] uppercase tracking-[0.16em] text-accent">
                    {tag}
                  </span>
                  <span className="block truncate text-sm font-semibold">{pick.name}</span>
                  <span className="mono block truncate text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    {note(pick)}
                  </span>
                </span>
                <ArrowRight className="ml-auto hidden h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1 sm:block" />
              </Link>
            ),
        )}
      </div>

      {/* Collection cards, scoped to the lens */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cats.map(({ c, inCat }) => {
          const pick = inCat[0];
          const from = Math.min(...inCat.map((p) => p.price));
          const avg = inCat.reduce((s, p) => s + p.rating, 0) / inCat.length;
          const brands = Array.from(new Set(inCat.map((p) => p.brand))).slice(0, 3);
          const best = inCat.reduce((b, p) => (p.rating > b.rating ? p : b), inCat[0]);
          return (
            <Link
              key={c.slug}
              to="/shop"
              search={{ cat: c.slug }}
              className="group relative flex aspect-[5/4] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_20px_50px_-24px_oklch(0.65_0.24_25/0.65)] sm:p-5"
            >
              {pick && (
                <img
                  src={pick.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-25 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px 200px at 80% 0%, oklch(0.65 0.24 25 / 0.28), transparent 70%)",
                }}
              />
              <div className="relative flex h-full min-w-0 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <span className="mono truncate text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {c.slug.replace(/-/g, " ")}
                  </span>
                  <span className="mono shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] text-accent">
                    {inCat.length}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="truncate font-display text-lg font-bold leading-tight sm:text-xl">
                    {c.name}
                  </div>
                  <div className="mono mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span>From ₹{from.toLocaleString("en-IN")}</span>
                    <span className="inline-flex items-center gap-1 text-accent">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      {avg.toFixed(1)} avg
                    </span>
                  </div>
                  <div className="mono mt-1 hidden truncate text-[9px] uppercase tracking-[0.12em] text-muted-foreground/80 sm:block">
                    {brands.join(" · ")}
                  </div>
                  <div className="mono mt-1.5 truncate text-[9px] uppercase tracking-[0.12em] text-foreground/60">
                    Best here · {best.name}
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Shop {c.name}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Trending lenses — each ranks the catalogue by a different signal. */
const TRENDING_VIEWS = [
  {
    key: "hot",
    label: "Hot right now",
    note: "Ranked by review volume this week",
    sort: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => b.reviews - a.reviews,
  },
  {
    key: "rated",
    label: "Top rated",
    note: "Highest verified owner ratings",
    sort: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => b.rating - a.rating,
  },
  {
    key: "deals",
    label: "Biggest drops",
    note: "Deepest discounts off MRP",
    sort: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) => b.discount - a.discount,
  },
  {
    key: "fresh",
    label: "Just landed",
    note: "Newest additions to the lineup",
    sort: (a: (typeof PRODUCTS)[number], b: (typeof PRODUCTS)[number]) =>
      Number(!!b.isNew) - Number(!!a.isNew) || b.id - a.id,
  },
] as const;

function TrendingNow() {
  const [view, setView] = useState<(typeof TRENDING_VIEWS)[number]["key"]>("hot");
  const active = TRENDING_VIEWS.find((v) => v.key === view) ?? TRENDING_VIEWS[0];
  const list = [...PRODUCTS].sort(active.sort).slice(0, 8);

  return (
    <section className="relative overflow-hidden bg-surface py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60"
        style={{
          background:
            "radial-gradient(700px 280px at 78% 0%, oklch(0.65 0.24 25 / 0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono text-accent">— Trending now</span>
              <span className="mono inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[9px] tracking-[0.18em] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                UPDATED HOURLY
              </span>
            </div>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Hand-picked.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">{active.note}</p>
          </div>
          <Link
            to="/shop"
            className="mono inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[11px] transition-colors hover:border-accent hover:text-accent"
          >
            SEE ALL <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="-mx-4 mt-6 mb-8 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {TRENDING_VIEWS.map((v) => {
            const on = v.key === view;
            return (
              <button
                key={v.key}
                type="button"
                aria-pressed={on}
                onClick={() => setView(v.key)}
                className={`mono shrink-0 snap-start rounded-full border px-3.5 py-2 text-[10px] uppercase tracking-[0.14em] transition-all ${
                  on
                    ? "border-accent bg-accent text-accent-foreground shadow-[0_10px_30px_-16px_oklch(0.65_0.24_25/0.9)]"
                    : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <div key={p.id} className="relative">
              <span
                className={`mono pointer-events-none absolute -left-1 -top-1 z-10 grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${
                  i < 3
                    ? "bg-accent text-accent-foreground"
                    : "border border-border bg-card text-muted-foreground"
                }`}
                aria-hidden
              >
                {i + 1}
              </span>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
