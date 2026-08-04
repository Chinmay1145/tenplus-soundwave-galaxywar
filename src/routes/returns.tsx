import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, Steps, DataTable } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds — PULSE" },
      { name: "description", content: "15-day no-questions-asked returns with free reverse pickup across India and 5-day refunds." },
      { property: "og:title", content: "PULSE Returns — love it or send it back" },
      { property: "og:description", content: "15-day returns, free reverse pickup, refunds in 5 business days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <PolicyPage
      eyebrow="Returns & Refunds"
      title="Love it or send it back."
      intro="15-day no-questions-asked returns, free reverse pickup anywhere we deliver, and refunds processed within 5 business days of pickup."
      highlights={[
        { label: "Return window", value: "15 days" },
        { label: "Reverse pickup", value: "Free" },
        { label: "Refund time", value: "5 days" },
        { label: "Pickup scheduled in", value: "48 hrs" },
      ]}
      toc={[
        { label: "How it works", href: "#how" },
        { label: "Eligibility", href: "#eligibility" },
        { label: "Refunds", href: "#refunds" },
        { label: "Damaged item", href: "#damaged" },
      ]}
    >
      <Section id="how" kicker="Four steps" title="How a return works">
        <Steps
          items={[
            { title: "Open the order", body: "Go to My Orders and hit Return on the order you want to send back." },
            { title: "Pick a reason", body: "Choose refund, exchange or warranty replacement and add photos if relevant." },
            { title: "Free pickup", body: "Our courier arrives within 48 hours — keep the original box handy." },
            { title: "Money back", body: "Refund is initiated the moment the unit passes inspection at our hub." },
          ]}
        />
      </Section>

      <Section id="eligibility" kicker="The rules" title="Eligibility">
        <ul className="list-disc space-y-2 pl-5">
          <li>Returns must be initiated within 15 days of delivery.</li>
          <li>Product, charging case, all accessories and original packaging must be intact.</li>
          <li>Earbud silicone tips must be unused for hygiene reasons (replacement tips ship in the box).</li>
          <li>Serial number on the unit must match the invoice.</li>
        </ul>
        <Callout title="Opened is fine" tone="muted">
          You are meant to listen before you decide. Opening the box, pairing the product and using it
          for a week does not affect your return — we only ask that everything comes back with it.
        </Callout>
      </Section>

      <Section id="refunds" kicker="Money" title="How refunds are processed">
        <DataTable
          head={["Payment method", "Refunded to", "Typical time"]}
          rows={[
            ["UPI", "Source UPI handle", "2–3 working days"],
            ["Credit / Debit card", "Original card", "5–7 working days"],
            ["Net banking", "Source bank account", "3–5 working days"],
            ["Cash on delivery", "Bank account via NEFT", "5 working days after IFSC"],
          ]}
        />
        <p>
          Choosing an <strong>exchange</strong> instead of a refund is faster — the replacement ships
          the same day pickup is verified, so you are never without your gear for long.
        </p>
      </Section>

      <Section id="damaged" kicker="Edge cases" title="Damaged or wrong product">
        <p>
          Email <a className="text-accent underline" href="mailto:care@pulse.audio">care@pulse.audio</a>{" "}
          with a 30-second unboxing video within 48 hours of delivery — we dispatch a replacement
          immediately, with no return required and no questions asked.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Missing accessory: we courier the part separately, next day.</li>
          <li>Dead on arrival: replacement dispatched the same day we see the video.</li>
          <li>Wrong item shipped: we pick up and re-ship at our cost, priority express.</li>
        </ul>
      </Section>
    </PolicyPage>
  );
}
