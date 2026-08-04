import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, Steps, DataTable, InfoCards } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "Affiliates — PULSE" },
      { name: "description", content: "Earn 8–12% lifetime commission on every PULSE order through our affiliate program." },
      { property: "og:title", content: "PULSE Affiliate Program" },
      { property: "og:description", content: "8–12% commission, 60-day cookie, real-time dashboard and review samples." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliatesPage,
});

function AffiliatesPage() {
  return (
    <PolicyPage
      eyebrow="Affiliates"
      title="Sound recommendations, paid."
      intro="The PULSE Affiliate Program rewards creators, reviewers and audio enthusiasts who introduce people to better gear — with commissions that actually compound."
      highlights={[
        { label: "Base commission", value: "8%" },
        { label: "Flagship categories", value: "12%" },
        { label: "Cookie window", value: "60 days" },
        { label: "Approval time", value: "48 hrs" },
      ]}
      toc={[
        { label: "Earnings", href: "#earnings" },
        { label: "What we give", href: "#support" },
        { label: "How to join", href: "#apply" },
      ]}
    >
      <Section id="earnings" kicker="Payouts" title="What you earn">
        <DataTable
          head={["Tier", "Monthly attributed revenue", "Commission"]}
          rows={[
            ["Signal", "Up to ₹50,000", "8%"],
            ["Amplified", "₹50,000 – ₹2,00,000", "10%"],
            ["Reference", "Above ₹2,00,000", "12% + 2% bonus"],
            ["Flagship & luxury", "Any volume", "12% flat"],
          ]}
        />
        <p>
          Paid monthly by direct bank transfer on the 7th, with a 60-day cookie window and first-touch
          attribution. No minimum payout threshold.
        </p>
      </Section>

      <Section id="support" kicker="Toolkit" title="What we provide">
        <InfoCards
          items={[
            { title: "Your own storefront", body: "A UTM-linked store plus a personal discount code your audience can actually use.", badge: "Custom" },
            { title: "Real-time dashboard", body: "Clicks, conversions, earnings and payout status, updated live." },
            { title: "Editorial assets", body: "Product imagery, lifestyle video, spec sheets and review samples on request." },
            { title: "Partner manager", body: "A dedicated human once you cross ₹1L per month in attributed revenue." },
          ]}
        />
      </Section>

      <Section id="apply" kicker="Get started" title="How to join">
        <Steps
          items={[
            { title: "Send your channel", body: "Email partners@pulse.audio with your platform, audience size and categories." },
            { title: "Quick review", body: "We check fit and reply within 48 hours — no follower minimums." },
            { title: "Get your links", body: "You receive a storefront, code and dashboard access the same day." },
            { title: "Start earning", body: "Commissions accrue instantly and pay out on the 7th of each month." },
          ]}
        />
        <Callout title="Honest reviews only">
          We never ask for a scripted opinion or veto a negative review. Say what you actually hear —
          that is the entire reason the program works.
        </Callout>
      </Section>
    </PolicyPage>
  );
}
