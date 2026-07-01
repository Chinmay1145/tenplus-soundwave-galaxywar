import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. We'll get back within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mono text-accent">— Contact</div>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Say hello.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Questions about a product, an order, or a partnership? We're here.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border/60 bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={form.name} on={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" type="email" value={form.email} on={(v) => setForm({ ...form, email: v })} />
          </div>
          <label className="block">
            <span className="mono mb-1.5 block text-muted-foreground">Message</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <button className="btn-magnetic rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">Send message</button>
        </form>

        <aside className="space-y-3">
          {[
            [Mail, "support@pulseaudio.com"],
            [Phone, "+91 80 4567 8900"],
            [MapPin, "Indiranagar, Bengaluru 560038"],
            [MessageCircle, "Live chat · 9am – 9pm IST"],
          ].map(([Ico, t]) => {
            const Icon = Ico as typeof Mail;
            return (
              <div key={t as string} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4">
                <div className="grid h-9 w-9 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm">{t as string}</div>
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, on, type = "text" }: { label: string; value: string; on: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mono mb-1.5 block text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => on(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
