import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, InfoCards } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — PULSE" },
      { name: "description", content: "Press kit, brand assets and media inquiries for PULSE Audio Labs." },
      { property: "og:title", content: "PULSE Press Room" },
      { property: "og:description", content: "Coverage, brand assets, executive bios and media contacts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PressPage,
});

const COVERAGE = [
  { src: "The Verge", quote: "PULSE has quietly become India's most thoughtful audio house." },
  { src: "WIRED", quote: "An obsessive attention to fit and finish — the AirWave 3 is best-in-class." },
  { src: "Forbes India", quote: "The Apple-of-audio reputation is well earned." },
  { src: "YourStory", quote: "A direct-to-consumer hardware story India desperately needed." },
];

const FACTS = [
  { k: "Founded", v: "2019, Bangalore" },
  { k: "Team", v: "84 across 5 cities" },
  { k: "Catalogue", v: "150 products, 24 brands" },
  { k: "Customers served", v: "1.2M+ in India" },
];

function PressPage() {
  return (
    <PolicyPage
      eyebrow="Press"
      title="News, kits & media."
      intro="Brand assets, executive bios, product photography and high-resolution renders for editors and reporters — usually in your inbox the same day."
      highlights={[
        { label: "Reply time", value: "< 24 hrs" },
        { label: "Review units", value: "48 hrs" },
        { label: "Asset library", value: "1.4 GB" },
        { label: "Press mentions", value: "310+" },
      ]}
      toc={[
        { label: "Coverage", href: "#coverage" },
        { label: "Fact sheet", href: "#facts" },
        { label: "Assets", href: "#assets" },
        { label: "Contacts", href: "#contacts" },
      ]}
    >
      <Section id="coverage" kicker="Selected" title="In the press">
        <div className="not-prose grid gap-4 sm:grid-cols-2">
          {COVERAGE.map((c) => (
            <figure
              key={c.src}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-accent/50"
            >
              <span aria-hidden className="font-display absolute right-4 top-2 text-5xl text-accent/15">
                &ldquo;
              </span>
              <blockquote className="relative font-display text-lg leading-snug">{c.quote}</blockquote>
              <figcaption className="mono mt-3 text-[10px] uppercase tracking-[0.16em] text-accent">
                — {c.src}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="facts" kicker="At a glance" title="Company fact sheet">
        <div className="not-prose grid gap-3 sm:grid-cols-2">
          {FACTS.map((f) => (
            <div key={f.k} className="rounded-2xl border border-border/60 bg-surface-2/50 p-5">
              <div className="mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{f.k}</div>
              <div className="mt-1.5 font-display text-xl font-bold">{f.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="assets" kicker="Downloads" title="Brand assets">
        <InfoCards
          items={[
            { title: "Logo pack", body: "Primary sigil and wordmark in SVG, PNG and EPS, light and dark variants.", badge: "SVG" },
            { title: "Product photography", body: "Studio and lifestyle shots at 6000 px, cleared for editorial use." },
            { title: "Executive bios", body: "Headshots and approved biographies for founders and category leads." },
            { title: "Brand book", body: "Colour, typography and tone-of-voice rules, plus naming conventions.", badge: "PDF" },
          ]}
        />
        <p>
          Email <a className="text-accent underline" href="mailto:press@pulse.audio">press@pulse.audio</a>{" "}
          with your publication, deadline and the specific asset you need — we reply within 24 hours.
        </p>
      </Section>

      <Section id="contacts" kicker="Talk to us" title="Media inquiries">
        <Callout title="PR lead — Anjali Mehta">
          Interviews, product reviews and launch events:{" "}
          <a className="text-accent underline" href="mailto:anjali@pulse.audio">anjali@pulse.audio</a>. For
          review units, include your shipping address and the review window you're working to.
        </Callout>
      </Section>
    </PolicyPage>
  );
}
