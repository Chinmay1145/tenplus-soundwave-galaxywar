import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, DataTable, InfoCards } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — PULSE" },
      { name: "description", content: "Carbon-neutral shipping, recycled plastic enclosures, and an end-to-end take-back program." },
      { property: "og:title", content: "PULSE Sustainability" },
      { property: "og:description", content: "Recycled materials, carbon-neutral delivery and a free take-back program." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return (
    <PolicyPage
      eyebrow="Sustainability"
      title="Sound choices for the planet."
      intro="Audio gear has a real environmental footprint. We're working to shrink ours — measurably, transparently, and with numbers we publish every year."
      highlights={[
        { label: "Recycled aluminium", value: "100%" },
        { label: "PCR plastic", value: "≥ 60%" },
        { label: "Carbon-neutral orders", value: "Every one" },
        { label: "Units taken back", value: "41,800" },
      ]}
      toc={[
        { label: "Materials", href: "#materials" },
        { label: "Carbon", href: "#carbon" },
        { label: "Take-back", href: "#takeback" },
        { label: "2030 targets", href: "#targets" },
      ]}
    >
      <Section id="materials" kicker="What it's made of" title="Materials">
        <InfoCards
          items={[
            { title: "Recycled aluminium", body: "All premium charging cases use 100% recycled aluminium stock.", badge: "100%" },
            { title: "PCR plastics", body: "Post-consumer recycled content of at least 60% across every earbud body." },
            { title: "Plastic-free packaging", body: "FSC-certified boxes, sleeves and dividers. No blister packs, no foam.", badge: "FSC" },
            { title: "Soy-based inks", body: "Every printed surface uses water-based or soy inks, fully de-inkable." },
          ]}
        />
      </Section>

      <Section id="carbon" kicker="Emissions" title="Carbon">
        <p>
          Every order ships <strong>carbon-neutral</strong> through verified Gold-Standard offsets
          covering inbound logistics, warehousing and last-mile delivery. Our annual emissions report
          is published alongside our investor update.
        </p>
        <DataTable
          head={["Scope", "FY25 emissions", "vs FY24"]}
          rows={[
            ["Scope 1 — facilities", "410 tCO₂e", "-12%"],
            ["Scope 2 — purchased power", "1,180 tCO₂e", "-19%"],
            ["Scope 3 — logistics", "6,240 tCO₂e", "-7%"],
            ["Offset & retired", "7,830 tCO₂e", "100% of total"],
          ]}
        />
      </Section>

      <Section id="takeback" kicker="End of life" title="Take-back & repair">
        <p>
          Send back any PULSE product at end-of-life — we cover the freight. Working units are
          refurbished and donated to schools; the rest are responsibly recycled via E-Parisaraa
          (BIS-licensed).
        </p>
        <Callout title="Repair before replace">
          Battery replacements are available for every over-ear model at 30% of the original product
          price, and spare ear-cushions and cables stay in stock for seven years after launch.
        </Callout>
      </Section>

      <Section id="targets" kicker="Commitments" title="Our 2030 targets">
        <ul className="list-disc space-y-2 pl-5">
          <li>Net-zero Scope 1 + 2 emissions</li>
          <li>90% recycled or bio-based materials by mass</li>
          <li>Zero virgin plastic in packaging</li>
          <li>Repairability score of 8/10 or better across the full catalogue</li>
        </ul>
      </Section>
    </PolicyPage>
  );
}
