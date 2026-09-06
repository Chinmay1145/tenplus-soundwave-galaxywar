import { Link } from "@tanstack/react-router";
import {
  Github,
  Instagram,
  Twitter,
  Youtube,
  Headphones,
  ShieldCheck,
  Truck,
  RotateCcw,
  Mail,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";
import { Logo, LogoMark } from "./Logo";
import { Button } from "@/components/ui/button";

const PROMISES = [
  [Truck, "Free express shipping", "On every order, pan-India"],
  [RotateCcw, "30-day returns", "No questions, free pickup"],
  [ShieldCheck, "2-year warranty", "Auto-registered to you"],
  [Headphones, "Priority care", "Real humans in 60s"],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-surface">
      {/* accent hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent) 35%, var(--color-accent) 65%, transparent)",
          opacity: 0.7,
        }}
      />
      {/* faint ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.65 0.24 25 / 0.10), transparent)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 border-b border-border/60 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="mono text-accent">The listening room / 2026</span>
            </div>
            <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[0.98] sm:text-6xl lg:text-7xl">
              Find the sound you’ll<br className="hidden sm:block" /> want to{" "}
              <span className="text-accent">live in.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Compare signatures, explore new releases and choose audio built
              around the way you actually listen.
            </p>
          </div>
          <Button asChild size="lg" className="group h-12 w-fit rounded-none px-6">
            <Link to="/shop">
              Explore all collections
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Promise strip */}
        <div className="grid border-b border-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([Ico, title, sub], index) => (
            <div
              key={title}
              className="flex min-w-0 items-start gap-3 border-border/60 py-6 sm:px-5 sm:odd:border-r lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-accent/30 bg-accent/10 text-accent">
                <Ico className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="mono text-[11px] tracking-[0.2em] text-accent/70">0{index + 1}</span>
                  {title}
                </div>
                <div className="mt-1 text-xs leading-5 text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-12 md:gap-12 md:py-14 lg:py-20">
          <div className="col-span-2 md:col-span-4 md:pr-8">
            <Link
              to="/"
              className="group inline-flex items-center gap-4 border-y border-border/60 py-4"
              aria-label="PULSE home"
            >
              <span className="grid h-14 w-14 place-items-center border border-accent/40 bg-accent/5 transition-colors group-hover:bg-accent/10">
                <Logo size={42} wordmark={false} />
              </span>
              <span>
                <span className="block font-display text-2xl font-bold leading-none">PULSE<span className="text-accent">.</span></span>
                <span className="mono mt-1.5 block text-[9px] text-muted-foreground">Audio laboratory / Est. 2021</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              Precision audio for music, calls, gaming and movement — designed
              in Stockholm, tuned for listeners everywhere.
            </p>

            {/* Newsletter */}
            <form
              className="mt-7 border-b border-border focus-within:border-accent"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="relative grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="Your email for drops"
                  aria-label="Email address"
                  className="h-12 w-full bg-transparent pl-10 pr-3 text-base outline-none placeholder:text-sm placeholder:text-muted-foreground"
                />
                <Button type="submit" size="icon" variant="ghost" className="rounded-none" aria-label="Subscribe">
                  <ArrowRight />
                </Button>
              </label>
            </form>

            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Youtube, Github].map((Ico, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center border border-border/60 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  aria-label={["Instagram", "Twitter", "YouTube", "GitHub"][i]}
                >
                  <Ico className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={[
            ["New Arrivals", "/shop"],
            ["Best Sellers", "/shop"],
            ["Premium ANC", "/shop?cat=anc"],
            ["Gaming Buds", "/shop?cat=gaming"],
            ["Limited Edition", "/shop?cat=luxury"],
          ]} />
          <FooterCol title="Support" links={[
            ["Contact", "/contact"],
            ["Warranty", "/warranty"],
            ["Returns & Refunds", "/returns"],
            ["Shipping", "/shipping"],
            ["FAQ", "/faq"],
            ["Track Order", "/track-order"],
          ]} />
          <FooterCol title="Company" links={[
            ["About", "/about"],
            ["Press", "/press"],
            ["Sustainability", "/sustainability"],
            ["Careers", "/careers"],
            ["Affiliates", "/affiliates"],
          ]} />
          <FooterCol title="Account" links={[
            ["Sign in", "/auth"],
            ["My orders", "/orders"],
            ["Wishlist", "/wishlist"],
            ["Compare", "/compare"],
            ["Cart", "/cart"],
          ]} />
        </div>

        {/* Payments + assurances */}
        <div className="grid gap-5 border-t border-border/60 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {["VISA", "MASTERCARD", "RUPAY", "UPI", "NETBANKING", "EMI", "COD"].map((p) => (
              <span
                key={p}
                className="mono border border-border/70 bg-surface-2 px-2.5 py-1.5 text-[9px] text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole className="h-3 w-3 text-accent" /> PCI-DSS SECURE CHECKOUT
            </span>
            <span>256-BIT TLS</span>
            <span>GST INVOICE ON EVERY ORDER</span>
          </div>
        </div>

        {/* Signature strip — logo lockup + studio tagline */}
        <div className="grid gap-4 border-t border-border/60 py-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
          <Link
            to="/"
            className="group flex w-fit items-center gap-3"
            aria-label="PULSE home"
          >
            <span className="grid h-11 w-11 place-items-center border border-accent/40 bg-accent/5 transition-colors group-hover:bg-accent/10">
              <LogoMark size={28} />
            </span>
            <span className="font-display text-lg font-bold tracking-[0.18em]">
              PULSE<span className="text-accent">.</span>
            </span>
          </Link>
          <div className="mono text-[10px] tracking-[0.28em] text-muted-foreground sm:text-center">
            SOUND / FORM / MOTION — THE LISTENING ROOM
          </div>
          <div className="mono hidden text-[10px] tracking-[0.2em] text-accent/70 sm:block">
            EST. 2021
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border/60 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="mono">© {new Date().getFullYear()} PULSE AUDIO LABS</div>
          <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link to="/shipping" className="hover:text-accent">SHIPPING</Link>
            <span className="opacity-40">·</span>
            <Link to="/returns" className="hover:text-accent">RETURNS</Link>
            <span className="opacity-40">·</span>
            <Link to="/warranty" className="hover:text-accent">WARRANTY</Link>
            <span className="opacity-40">·</span>
            <Link to="/faq" className="hover:text-accent">FAQ</Link>
          </div>
          <div className="mono">DESIGNED IN STOCKHOLM · ASSEMBLED IN INDIA</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="min-w-0 md:col-span-2">
      <div className="mono mb-4 border-b border-border/60 pb-2 text-[11px] tracking-[0.2em] text-muted-foreground">{title}</div>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              to={href}
              className="inline-block text-sm text-foreground/80 transition-all hover:translate-x-0.5 hover:text-accent"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
