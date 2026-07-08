import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LogoMark } from "@/components/site/Logo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — PULSE" },
      { name: "description", content: "Get in touch with PULSE for orders, warranty and product support." },
      { property: "og:title", content: "Contact — PULSE" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Product support", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Message sent. We'll get back within 24 hours.");
    setForm({ name: "", email: "", topic: "Product support", message: "" });
    setSending(false);
  };

  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 90% -10%, oklch(0.65 0.24 25 / 0.22), transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <LogoMark size={28} />
              <div className="mono text-accent">— Contact · 24h response</div>
            </div>
            <h1 className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-[104px]">
              Say <span className="shimmer-text italic">hello.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Questions about a product, an order, or a partnership? We're a
              small team based in Bengaluru and Stockholm, and we answer every
              message ourselves.
            </p>
          </div>
          <div className="flex items-end lg:col-span-4">
            <div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60">
              {[
                ["< 24h", "Reply time"],
                ["9–9", "Live chat IST"],
                ["24 mo.", "Warranty"],
                ["Free", "Returns 30d"],
              ].map(([n, l]) => (
                <div key={l} className="bg-background px-4 py-5">
                  <div className="font-display text-2xl font-bold tracking-tight">{n}</div>
                  <div className="mono mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORM + CHANNELS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <form
            onSubmit={submit}
            className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(500px 260px at 0% 0%, oklch(0.65 0.24 25 / 0.14), transparent 60%)" }}
            />
            <div className="relative">
              <div className="mono text-accent">— Send us a note</div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Start a conversation.</h2>

              <div className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" value={form.name} on={(v) => setForm({ ...form, name: v })} placeholder="Ada Lovelace" />
                  <Field label="Email" type="email" value={form.email} on={(v) => setForm({ ...form, email: v })} placeholder="ada@studio.com" />
                </div>

                <div>
                  <span className="mono mb-2 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Topic</span>
                  <div className="flex flex-wrap gap-2">
                    {["Product support", "Order & shipping", "Warranty", "Press", "Partnership"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, topic: t })}
                        className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                          form.topic === t
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border bg-surface-2 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mono mb-2 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    required
                    placeholder="Tell us what's on your mind…"
                    className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="mono text-[11px] text-muted-foreground">
                    We reply in under 24 hours · Mon–Sat
                  </div>
                  <button
                    disabled={sending}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110 disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send message"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Channels */}
          <aside className="flex flex-col gap-3">
            {[
              [Mail, "Email", "support@pulseaudio.com", "mailto:support@pulseaudio.com"],
              [Phone, "Phone", "+91 80 4567 8900", "tel:+918045678900"],
              [MessageCircle, "Live chat", "9am – 9pm IST", null],
              [MapPin, "Studio", "Indiranagar, Bengaluru 560038", null],
            ].map(([Ico, label, val, href]) => {
              const Icon = Ico as typeof Mail;
              const inner = (
                <>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label as string}</div>
                    <div className="mt-0.5 truncate font-display text-base font-bold tracking-tight">{val as string}</div>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </>
              );
              return href ? (
                <a
                  key={label as string}
                  href={href as string}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition hover:border-accent/50 hover:bg-card/80"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={label as string}
                  className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4"
                >
                  {inner}
                </div>
              );
            })}

            <div className="mt-2 rounded-2xl border border-border/60 bg-card p-5">
              <div className="mono mb-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Hours</div>
              <div className="space-y-1.5 text-sm">
                <Row k="Mon – Fri" v="9:00 – 21:00 IST" />
                <Row k="Saturday" v="10:00 – 18:00 IST" />
                <Row k="Sunday" v="Closed" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* HELP SHORTCUTS */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="mono text-accent">— Faster than an email</div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Answer it yourself.</h2>
            </div>
            <Link to="/faq" className="mono text-xs text-muted-foreground hover:text-foreground">
              ALL FAQS →
            </Link>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Truck, "Track order", "See where your package is right now.", "/track-order"],
              [ShieldCheck, "Warranty", "24-month cover on every product.", "/warranty"],
              [Clock, "Returns", "30-day, no-questions-asked returns.", "/returns"],
              [MessageCircle, "FAQ", "Answers to the top 40 questions.", "/faq"],
            ].map(([Ico, t, d, to]) => {
              const Icon = Ico as typeof Truck;
              return (
                <Link
                  key={t as string}
                  to={to as string}
                  className="group relative flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-card"
                >
                  <Icon className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  <div className="font-display text-lg font-bold tracking-tight">{t as string}</div>
                  <div className="text-sm text-muted-foreground">{d as string}</div>
                  <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{k}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

function Field({
  label,
  value,
  on,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  on: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mono mb-2 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => on(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
