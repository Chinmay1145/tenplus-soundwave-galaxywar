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
import { LogoMark } from "./Logo";

const PROMISES = [
  [Truck, "Free express shipping", "On every order, pan-India"],
  [RotateCcw, "30-day returns", "No questions, free pickup"],
  [ShieldCheck, "2-year warranty", "Auto-registered to you"],
  [Headphones, "Priority care", "Real humans in 60s"],
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-surface">
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

      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="min-w-0">
            <div className="mono mb-6 flex items-center gap-3 text-[10px] tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              THE LISTENING ROOM / 2026
            </div>
            <h2 className="font-display text-4xl font-extrabold uppercase italic leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Find the sound
              <br className="hidden sm:block" /> you&rsquo;ll want to{" "}
              <span className="text-accent">live in.</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex h-14 shrink-0 items-center gap-3 bg-foreground px-8 text-xs font-bold uppercase tracking-[0.2em] text-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground sm:h-16 sm:px-10"
          >
            Explore all collections
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Promise strip */}
      <div className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {PROMISES.map(([Ico, title, sub]) => (
            <div key={title} className="group flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/70 text-foreground transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                <Ico className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <div className="mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/90">
                  {title}
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-3" aria-label="PULSE home">
              <span className="grid h-12 w-12 place-items-center border border-border/70 transition-colors group-hover:border-accent/60">
                <LogoMark size={34} />
              </span>
              <span className="font-display text-2xl font-black uppercase tracking-[0.18em]">
                PULSE<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
              Precision audio for music, calls, gaming and movement — designed
              in Stockholm, tuned for listeners everywhere.
            </p>

            {/* Newsletter */}
            <div className="mt-8 max-w-sm">
              <div className="mono mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                Newsletter
              </div>
              <form
                className="group flex border-b border-border pb-2 transition-colors focus-within:border-foreground"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="relative grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="Your email for drops"
                    aria-label="Email address"
                    className="h-10 w-full bg-transparent text-base outline-none placeholder:text-sm placeholder:text-muted-foreground"
                  />
                </label>
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-2 text-foreground transition-transform hover:translate-x-1"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Social */}
            <div className="mt-8 flex gap-6">
              {[Instagram, Twitter, Youtube, Github].map((Ico, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={["Instagram", "Twitter", "YouTube", "GitHub"][i]}
                >
                  <Ico className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:col-span-8">
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
              ["Reviews", "/reviews"],
              ["Cart", "/cart"],
            ]} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2">
              {["VISA", "MASTERCARD", "RUPAY", "UPI", "NETBANKING", "EMI", "COD"].map((p) => (
                <span
                  key={p}
                  className="mono cursor-default border border-border/70 bg-surface-2 px-2.5 py-1.5 text-[9px] text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              © {new Date().getFullYear()} PULSE AUDIO LABS
            </div>
            <div className="mono flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Link to="/shipping" className="transition-colors hover:text-foreground">Shipping</Link>
              <Link to="/returns" className="transition-colors hover:text-foreground">Returns</Link>
              <Link to="/warranty" className="transition-colors hover:text-foreground">Warranty</Link>
              <Link to="/faq" className="transition-colors hover:text-foreground">FAQ</Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <LockKeyhole className="h-3 w-3 text-accent" /> PCI-DSS SECURE CHECKOUT
              </span>
              <span>256-BIT TLS</span>
              <span>GST INVOICE ON EVERY ORDER</span>
            </div>
            <div className="mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
              Designed for high-fidelity living
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="min-w-0">
      <h4 className="mono mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
        {title}
      </h4>
      <ul className="space-y-3.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              to={href}
              className="inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
