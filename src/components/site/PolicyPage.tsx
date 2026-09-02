import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Clock, Headphones, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/site/Logo";

export function PolicyPage({
  eyebrow,
  title,
  intro,
  highlights,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** 2–4 quick facts rendered as a stat strip under the hero. */
  highlights?: { label: string; value: string }[];
  /** Optional in-page quick links (label + #anchor or route). */
  toc?: { label: string; href: string }[];
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-70"
        style={{
          background:
            "radial-gradient(900px 420px at 15% 0%, oklch(0.65 0.24 25 / 0.18), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <nav className="mono mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent">{eyebrow}</span>
        </nav>

        <div className="grid gap-8 border-y border-border/60 py-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-end lg:py-12">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={26} />
              <div className="mono text-[11px] uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
            </div>
            <h1 className="mt-3 max-w-4xl font-display text-[2.35rem] font-bold leading-[1.03] tracking-tight sm:mt-4 sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>
          <p className="max-w-xl border-l border-accent/50 pl-5 text-[15px] leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {intro}
          </p>
        </div>

        {highlights && highlights.length > 0 && (
          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 lg:grid-cols-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="border border-border/60 bg-card p-4 transition-colors hover:border-accent/50 sm:p-5"
              >
                <div className="font-display text-xl font-bold tracking-tight text-accent sm:text-2xl">
                  {h.value}
                </div>
                <div className="mono mt-1 text-[9px] uppercase leading-4 tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                  {h.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {toc && toc.length > 0 && (
          <div className="-mx-4 mt-6 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0">
            {toc.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="mono shrink-0 snap-start rounded-full border border-border bg-card px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t.label}
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-16">
          <div className="min-w-0 space-y-10 sm:space-y-14">{children}</div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card to-accent/10 p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 blur-3xl"
                style={{ background: "radial-gradient(circle, oklch(0.65 0.24 25 / 0.35), transparent 70%)" }}
              />
              <div className="relative">
                <div className="mono flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Support online
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">We reply within 4 hours.</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Indian customer care, every day 9 AM – 9 PM IST. Real humans, no scripts.
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  Contact support <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-accent" /> 1800-PULSE-IN (toll-free)
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="h-3.5 w-3.5 text-accent" /> care@pulse.audio
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5 text-accent" /> WhatsApp +91 99999 88888
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border/60 bg-card p-6">
              <div className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                — Our promise
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>100% genuine, sealed stock with full Indian warranty.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>Same-day dispatch before 4 PM IST, Mon–Sat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>15-day returns with free reverse pickup.</span>
                </li>
              </ul>
              <div className="mt-5 grid gap-2">
                <Link to="/track-order" className="mono rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] hover:border-accent hover:text-accent">
                  Track an order →
                </Link>
                <Link to="/faq" className="mono rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] hover:border-accent hover:text-accent">
                  Read the FAQ →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function Section({
  title,
  id,
  kicker,
  children,
}: {
  title: string;
  id?: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border/60 pt-8 first:border-0 first:pt-0">
      {kicker && (
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-accent">— {kicker}</div>
      )}
      <h2 className="mt-1.5 font-display text-[1.65rem] font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div className="prose-pulse mt-4 max-w-[68ch] space-y-4 text-[15px] leading-[1.75] text-foreground/80 sm:mt-5">
        {children}
      </div>
    </section>
  );
}

/** Highlighted note / warning block. */
export function Callout({
  title,
  tone = "accent",
  children,
}: {
  title: string;
  tone?: "accent" | "muted";
  children: ReactNode;
}) {
  return (
    <div
      className={`not-prose rounded-2xl border p-5 ${
        tone === "accent" ? "border-accent/40 bg-accent/[0.07]" : "border-border/60 bg-surface-2/50"
      }`}
    >
      <div className="font-display text-base font-bold">{title}</div>
      <div className="mt-1.5 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

/** Numbered step cards. */
export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="not-prose grid gap-3 sm:grid-cols-2">
      {items.map((s, i) => (
        <li
          key={s.title}
          className="border border-border/60 bg-card p-5 transition-colors hover:border-accent/50"
        >
          <span className="mono grid h-7 w-7 place-items-center rounded-full border border-accent/40 bg-accent/10 text-[11px] font-bold text-accent">
            {i + 1}
          </span>
          <div className="mt-3 font-display text-base font-bold">{s.title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Comparison / info card grid. */
export function InfoCards({
  items,
}: {
  items: { title: string; body: string; badge?: string }[];
}) {
  return (
    <div className="not-prose grid gap-3 sm:grid-cols-2">
      {items.map((c) => (
        <div key={c.title} className="border border-border/60 bg-card p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="font-display text-base font-bold">{c.title}</div>
            {c.badge && (
              <span className="mono shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-accent">
                {c.badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Simple two-column data table. */
export function DataTable({
  head,
  rows,
}: {
  head: [string, string, string?];
  rows: (readonly [string, string, string?])[];
}) {
  return (
    <div className="not-prose -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border/60 sm:px-0">
      <table className="w-full min-w-[420px] overflow-hidden rounded-2xl border border-border/60 text-left text-sm sm:min-w-0 sm:rounded-none sm:border-0">
        <thead className="bg-surface-2/70">
          <tr className="mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {head.filter(Boolean).map((h) => (
              <th key={h} className="px-4 py-3 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-border/50 bg-card">
              <td className="px-4 py-3 font-semibold">{r[0]}</td>
              <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
              {r[2] !== undefined && <td className="px-4 py-3 text-accent">{r[2]}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
