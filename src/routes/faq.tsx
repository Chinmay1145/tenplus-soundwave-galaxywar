import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PolicyPage, Section, Callout } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — PULSE" },
      { name: "description", content: "Answers to the most common questions about PULSE products, orders, warranty and audio tech." },
      { property: "og:title", content: "PULSE FAQ — asked and answered" },
      { property: "og:description", content: "Ordering, EMI, warranty claims, pairing and ANC — answered in plain language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

type Faq = { q: string; a: string; cat: string };

const FAQS: Faq[] = [
  { cat: "Orders", q: "Are PULSE products genuine?", a: "Yes — every PULSE product ships directly from authorized brand warehouses with a full Indian warranty and a tamper-proof seal." },
  { cat: "Payments", q: "Do you offer EMI?", a: "3, 6, 9 and 12-month no-cost EMI is available on all leading credit cards and Bajaj Finserv at checkout for orders above ₹3,000." },
  { cat: "Warranty", q: "How do I claim warranty?", a: "Open the order under My Orders → Request return → Warranty replacement. We pick up free and ship a replacement within 7 working days." },
  { cat: "Audio tech", q: "Will ANC work on all phones?", a: "Active Noise Cancellation runs entirely on the earbuds themselves — it works with any Bluetooth source (Android, iOS, laptop, console)." },
  { cat: "Orders", q: "Are these original or refurbished?", a: "Only brand-new, factory-sealed units. We never sell open-box or refurbished units on the main PULSE store." },
  { cat: "Audio tech", q: "How do I pair multipoint?", a: "Long-press the touch sensor for 5s with both ear-tips in the case — LED flashes blue, then pair from the first device, then second. Most models support 2 active devices at once." },
  { cat: "Orders", q: "Can I cancel an order?", a: "Yes — until the order moves to Shipped. After that, refuse delivery or create a return on receipt." },
  { cat: "Shipping", q: "Do you ship to APO / NEFA / Andaman?", a: "Yes, via India Post and Blue Dart Premium. Expect 6–10 working days." },
  { cat: "Shipping", q: "How do I track my order?", a: "Head to Track order, enter your order ID and the email used at checkout. Signed-in customers see every order with a live 5-step timeline — confirmed, packed, shipped, out for delivery, delivered." },
  { cat: "Payments", q: "Is COD available?", a: "COD is available on most pincodes up to ₹25,000. Orders of ₹999 and above ship COD free; below that a ₹49 handling fee applies." },
  { cat: "Warranty", q: "What voids my warranty?", a: "Unauthorized repair, liquid damage beyond the rated IP level, and physical damage from drops (unless you added PULSE Care+)." },
  { cat: "Audio tech", q: "What is the real battery life?", a: "Our listed numbers are measured at 50% volume with ANC on — the honest, everyday figure, not the lab best case." },
];

const CATS = ["All", "Orders", "Shipping", "Payments", "Warranty", "Audio tech"];

function FaqPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      FAQS.filter((f) => (cat === "All" || f.cat === cat))
        .filter((f) => {
          const s = q.trim().toLowerCase();
          if (!s) return true;
          return f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s);
        }),
    [cat, q],
  );

  return (
    <PolicyPage
      eyebrow="FAQ"
      title="Asked. Answered."
      intro="The most common questions about ordering, audio tech, warranty and our brand promise — in plain language, no fine print games."
      highlights={[
        { label: "First reply time", value: "< 4 hrs" },
        { label: "Questions covered", value: String(FAQS.length) },
        { label: "Support hours", value: "9–9 IST" },
        { label: "Resolved first contact", value: "92%" },
      ]}
    >
      <Section title="Search the knowledge base" kicker="Find it fast" id="search">
        <div className="not-prose">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “EMI”, “warranty”, “multipoint”…"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`mono rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  cat === c
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card hover:border-accent hover:text-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card">
            {list.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Nothing matched “{q}”. Try a different word, or ask us directly.
              </div>
            ) : (
              list.map((f) => (
                <details key={f.q} className="group px-5 py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-display text-base font-semibold">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="mono shrink-0 rounded-full border border-border/70 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                        {f.cat}
                      </span>
                      <span>{f.q}</span>
                    </span>
                    <span className="text-lg text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{f.a}</p>
                </details>
              ))
            )}
          </div>
        </div>
      </Section>

      <Section title="Still stuck?" kicker="Human help">
        <Callout title="Ask a real person">
          Our care team is in Bangalore and Pune — call 1800-PULSE-IN, WhatsApp +91 99999 88888, or
          write to care@pulse.audio. Average first reply is under 4 hours, every day.
        </Callout>
      </Section>
    </PolicyPage>
  );
}
