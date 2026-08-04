import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, Steps, InfoCards, DataTable } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/warranty")({
  head: () => ({
    meta: [
      { title: "Warranty — PULSE Audio Labs" },
      { name: "description", content: "1-year manufacturer warranty + 6-month accidental damage protection on all PULSE audio products." },
      { property: "og:title", content: "PULSE Warranty" },
      { property: "og:description", content: "1-year warranty + free pickup + replacement within 7 days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WarrantyPage,
});

function WarrantyPage() {
  return (
    <PolicyPage
      eyebrow="Warranty"
      title="Built to last. Backed for longer."
      intro="Every product carries a 1-year manufacturer warranty, plus optional PULSE Care+ for accidental damage and battery replacement."
      highlights={[
        { label: "Standard cover", value: "12 months" },
        { label: "Replacement in", value: "7 days" },
        { label: "Pickup charge", value: "₹0" },
        { label: "Claims approved", value: "96%" },
      ]}
      toc={[
        { label: "Covered", href: "#covered" },
        { label: "Not covered", href: "#not-covered" },
        { label: "Claim it", href: "#claim" },
        { label: "Care+", href: "#care-plus" },
      ]}
    >
      <Section id="covered" kicker="Included" title="What's covered">
        <InfoCards
          items={[
            { title: "Manufacturing defects", body: "Any fault in materials or workmanship, for the full 12 months.", badge: "12 mo" },
            { title: "Battery health", body: "Capacity falling below 80% of rated within 12 months is a valid claim." },
            { title: "Electronics", body: "Bluetooth, ANC, microphone and touch-control malfunction." },
            { title: "Charging case", body: "Latch, hinge and contact failures on the case or cradle." },
          ]}
        />
      </Section>

      <Section id="not-covered" kicker="Excluded" title="What's not covered">
        <ul className="list-disc space-y-2 pl-5">
          <li>Cosmetic damage — scratches, dents, discoloration</li>
          <li>Damage from liquid beyond the product's IP rating</li>
          <li>Unauthorized repair, modification or third-party accessories</li>
          <li>Loss or theft</li>
        </ul>
        <Callout title="Accidents happen" tone="muted">
          Drops, spills and cracked cases sit outside standard warranty everywhere in the industry —
          that is exactly the gap PULSE Care+ closes below.
        </Callout>
      </Section>

      <Section id="claim" kicker="Process" title="How to claim">
        <Steps
          items={[
            { title: "Open the order", body: "Sign in and find the order under My Orders." },
            { title: "Request return", body: "Choose Warranty replacement and describe the fault." },
            { title: "Free pickup", body: "We arrange a courier pickup within 48 hours at no cost." },
            { title: "Replacement", body: "Ships within 7 working days of unit verification." },
          ]}
        />
        <DataTable
          head={["Claim type", "What you get", "Turnaround"]}
          rows={[
            ["Dead on arrival", "Brand-new replacement unit", "24–48 hours"],
            ["Defect in month 1–6", "Replacement unit", "7 working days"],
            ["Defect in month 7–12", "Repair or replacement", "7–10 working days"],
            ["Battery below 80%", "Battery / unit replacement", "7 working days"],
          ]}
        />
      </Section>

      <Section id="care-plus" kicker="Optional" title="PULSE Care+">
        <p>
          Add Care+ at checkout for ₹999/year and get one accidental damage replacement, a free battery
          replacement after 18 months, and priority queue on every support channel.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>One accidental damage replacement per year, no depreciation deducted.</li>
          <li>Extends total cover to 24 months from the invoice date.</li>
          <li>Transferable if you gift or resell the product.</li>
        </ul>
      </Section>
    </PolicyPage>
  );
}
