import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, InfoCards } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — PULSE" },
      { name: "description", content: "Help us build India's most loved audio brand. Open roles across design, engineering and operations." },
      { property: "og:title", content: "Careers at PULSE Audio Labs" },
      { property: "og:description", content: "Open roles in acoustics, firmware, design and operations. Equity for every hire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const ROLES = [
  { title: "Senior Acoustic Engineer", team: "R&D · Bangalore", type: "Full-time", level: "6+ yrs" },
  { title: "Industrial Designer", team: "Design · Stockholm / Remote", type: "Full-time", level: "4+ yrs" },
  { title: "Firmware Engineer (BLE / Audio DSP)", team: "Hardware · Bangalore", type: "Full-time", level: "3+ yrs" },
  { title: "Senior Brand Manager", team: "Marketing · Mumbai", type: "Full-time", level: "5+ yrs" },
  { title: "Customer Care Specialist", team: "Support · Remote (India)", type: "Full-time", level: "1+ yrs" },
  { title: "Supply Chain Analyst", team: "Operations · Bangalore", type: "Full-time", level: "2+ yrs" },
];

function CareersPage() {
  return (
    <PolicyPage
      eyebrow="Careers"
      title="Hear the future. Help build it."
      intro="We're a small team of designers, audio engineers and operators obsessed with one thing — the most rewarding hour anyone spends with sound."
      highlights={[
        { label: "Open roles", value: String(ROLES.length) },
        { label: "Team size", value: "84" },
        { label: "Cities", value: "5" },
        { label: "Equity for hires", value: "100%" },
      ]}
      toc={[
        { label: "Open roles", href: "#roles" },
        { label: "How we work", href: "#how" },
        { label: "Benefits", href: "#benefits" },
      ]}
    >
      <Section id="roles" kicker="Hiring now" title="Open roles">
        <div className="not-prose grid gap-3">
          {ROLES.map((r) => (
            <div
              key={r.title}
              className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60"
            >
              <div className="min-w-0">
                <div className="font-display text-lg font-bold">{r.title}</div>
                <div className="mono mt-1 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>{r.team}</span>
                  <span className="text-accent">·</span>
                  <span>{r.type}</span>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">
                    {r.level}
                  </span>
                </div>
              </div>
              <a
                href={`mailto:careers@pulse.audio?subject=${encodeURIComponent(r.title)}`}
                className="shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform group-hover:-translate-y-0.5"
              >
                Apply →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section id="how" kicker="Culture" title="How we work">
        <InfoCards
          items={[
            { title: "Small teams, real ownership", body: "Two to five people per product line, end to end — from tuning curve to launch copy." },
            { title: "Listening beats meetings", body: "Every Friday is a blind listening session. Data and ears decide, not seniority." },
            { title: "Written first", body: "Decisions live in short memos, so anyone joining later can read the whole story." },
            { title: "Hire slow, invest deep", body: "Four-stage process, always paid for the practical round, with feedback either way.", badge: "Paid" },
          ]}
        />
      </Section>

      <Section id="benefits" kicker="Perks" title="Benefits">
        <ul className="list-disc space-y-2 pl-5">
          <li>Equity for every full-time hire</li>
          <li>Comprehensive health cover for you, your partner, kids and parents</li>
          <li>Annual hardware budget — pick any audio gear, ours or anyone's</li>
          <li>4-day workweek, every alternate week</li>
          <li>Fully covered hearing-health checks, twice a year</li>
        </ul>
        <Callout title="Nothing open that fits?">
          Write to careers@pulse.audio with what you'd want to build here. We keep strong profiles warm
          and reach out first when a role opens.
        </Callout>
      </Section>
    </PolicyPage>
  );
}
