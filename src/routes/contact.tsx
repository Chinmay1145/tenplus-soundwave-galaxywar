import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Headphones, ShieldCheck, Truck, RefreshCw, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — PULSE" },
      { name: "description", content: "Reach PULSE for orders, warranty, product support and partnerships. Indian customer care 9 AM – 9 PM IST, replies within 4 hours." },
      { property: "og:title", content: "Contact — PULSE" },
      { property: "og:description", content: "We reply within 4 hours. Phone, email, WhatsApp or in-app chat — take your pick." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const TOPICS = [
  "Order / Shipping",
  "Warranty claim",
  "Product support",
  "Returns & refunds",
  "Partnerships / Press",
  "Something else",
] as const;

const CHANNELS = [
  {
    icon: Phone,
    label: "Phone",
    value: "1800-PULSE-IN",
    sub: "Toll-free · 9 AM – 9 PM IST",
    href: "tel:18007857346",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 99999 88888",
    sub: "Fastest replies · usually < 10 min",
    href: "https://wa.me/919999988888",
  },
  {
    icon: Mail,
    label: "Email",
    value: "care@pulse.audio",
    sub: "Responses within 4 hours",
    href: "mailto:care@pulse.audio",
  },
  {
    icon: MapPin,
    label: "HQ",
    value: "Indiranagar, Bengaluru 560038",
    sub: "Mon – Fri · walk-ins by appointment",
    href: "https://maps.google.com/?q=Indiranagar+Bengaluru",
  },
] as const;

const PROMISES = [
  [Clock, "4-hour replies", "Every ticket answered within 4 business hours, guaranteed."],
  [ShieldCheck, "2-year warranty", "Global coverage on all PULSE products, no fine print."],
  [Truck, "Free shipping", "On orders above ₹999. 3-day delivery to Indian metros."],
  [RefreshCw, "30-day returns", "Not in love with it? Return it, unquestioned, unboxed or otherwise."],
] as const;

const FAQ: [string, string][] = [
  ["How long does delivery take?", "1–3 days to metros, 3–5 days elsewhere in India. Every order ships with tracking."],
  ["Do you ship internationally?", "Yes — 40+ countries via DHL Express. Duties are prepaid at checkout."],
  ["What if my product develops a fault?", "Two-year warranty. Raise a ticket, get a pickup, we replace or refund — your call."],
  ["Can I cancel or modify my order?", "Yes, up to 2 hours after placing it. Ping us on WhatsApp for the fastest turnaround."],
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0] as string, order: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and a short message.");
      return;
    }
    toast.success("Message sent. We'll be in touch within 4 hours.");
    setSent(true);
    setForm({ name: "", email: "", topic: TOPICS[0], order: "", message: "" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 500px at 50% -10%, oklch(0.65 0.24 25 / 0.2), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-20 sm:px-6 sm:pt-28">
          <div className="mono text-accent">— Contact</div>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            Say hello. <span className="shimmer-text">We're listening.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Product questions, order updates, or a partnership pitch — a real human
            replies within four hours, every day, 9 AM – 9 PM IST.
          </p>

          {/* Promise strip */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PROMISES.map(([Ico, t, d]) => {
              const Icon = Ico as typeof Clock;
              return (
                <div key={t} className="rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur">
                  <Icon className="h-4 w-4 text-accent" />
                  <div className="mt-3 font-display text-sm font-bold">{t}</div>
                  <div className="mt-1 text-xs leading-5 text-muted-foreground">{d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* FORM */}
          <form
            onSubmit={submit}
            className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8"
          >
            <div className="mono text-accent">— Send a message</div>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Tell us what you need.
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} on={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" value={form.email} on={(v) => setForm({ ...form, email: v })} required />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mono mb-1.5 block text-muted-foreground">Topic</span>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <Field label="Order # (optional)" value={form.order} on={(v) => setForm({ ...form, order: v })} placeholder="PUL-…" />
            </div>

            <label className="mt-4 block">
              <span className="mono mb-1.5 block text-muted-foreground">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                placeholder="Tell us what's going on…"
                required
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>

            <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-xs text-muted-foreground">
                By sending, you agree to our <Link to="/" className="underline">privacy policy</Link>. We never share your data.
              </p>
              <button className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30">
                Send message →
              </button>
            </div>

            {sent && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Thanks! A support engineer will reply from care@pulse.audio shortly.
              </div>
            )}
          </form>

          {/* CHANNELS */}
          <aside className="space-y-3">
            <div className="mono text-accent">— Reach us directly</div>
            {CHANNELS.map(({ icon: Icon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="mono text-[10px] uppercase text-muted-foreground">{label}</div>
                  <div className="mt-0.5 truncate font-display text-base font-bold group-hover:text-accent">
                    {value}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-accent" />
                <div className="mono text-[10px] uppercase text-muted-foreground">Product help</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Setup, pairing, firmware — most questions have a fix in our
                <Link to="/faq" className="mx-1 underline">FAQ</Link>
                or
                <Link to="/warranty" className="mx-1 underline">warranty guide</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mono text-accent">— Frequently asked</div>
        <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Quick answers.</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-2xl border border-border/60 bg-card p-5 open:shadow-lg"
            >
              <summary className="flex cursor-pointer items-center justify-between font-display text-base font-bold marker:hidden">
                {q}
                <span className="ml-4 grid h-7 w-7 place-items-center rounded-full border border-border/60 text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  on,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  on: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mono mb-1.5 block text-muted-foreground">{label}{required && <span className="ml-1 text-accent">*</span>}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => on(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
