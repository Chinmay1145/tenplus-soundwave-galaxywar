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
} from "lucide-react";
import { Logo } from "./Logo";

const PROMISES = [
  [Truck, "Free express shipping", "On every order, pan-India"],
  [RotateCcw, "30-day returns", "No questions, free pickup"],
  [ShieldCheck, "2-year warranty", "Auto-registered to you"],
  [Headphones, "Priority care", "Real humans in 60s"],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-56 opacity-50"
        style={{
          background:
            "radial-gradient(700px 240px at 50% 0%, oklch(0.65 0.24 25 / 0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Promise strip */}
        <div className="grid gap-4 border-b border-border/60 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([Ico, title, sub]) => (
            <div key={title} className="flex min-w-0 items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <Ico className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{title}</div>
                <div className="truncate text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label="PULSE home">
              <Logo size={40} animated />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The world's most premium wireless earbuds — engineered for music,
              calls, gaming, fitness and everyday luxury.
            </p>

            {/* Newsletter */}
            <form
              className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="relative min-w-0">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="Your email for drops"
                  aria-label="Email address"
                  className="w-full rounded-full border border-border bg-surface-2 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Youtube, Github].map((Ico, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-surface-2 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  aria-label="social"
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

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border/60 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="mono">© {new Date().getFullYear()} PULSE AUDIO LABS</div>
          <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SECURE PAYMENTS · UPI · CARDS · EMI
            </span>
          </div>
          <div className="mono">DESIGNED IN STOCKHOLM · ASSEMBLED IN INDIA</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="md:col-span-2">
      <div className="mono mb-4 text-muted-foreground">{title}</div>
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
