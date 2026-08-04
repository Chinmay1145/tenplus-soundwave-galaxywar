import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage, Section, Callout, Steps, DataTable, InfoCards } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — PULSE" },
      { name: "description", content: "Free express shipping across India. Same-day dispatch on orders before 4 PM IST, fully tracked." },
      { property: "og:title", content: "PULSE Shipping — free, fast, fully tracked" },
      { property: "og:description", content: "1–2 day metro delivery, same-day dispatch, live 5-step tracking on every order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <PolicyPage
      eyebrow="Shipping"
      title="Free, fast, fully tracked."
      intro="Every order ships through tier-1 courier partners with a live 5-step timeline and SMS / email / WhatsApp updates at each hub scan."
      highlights={[
        { label: "Metro delivery", value: "1–2 days" },
        { label: "Prepaid shipping", value: "Free" },
        { label: "Dispatch cut-off", value: "4 PM IST" },
        { label: "Pincodes served", value: "19,400+" },
      ]}
      toc={[
        { label: "Timelines", href: "#timelines" },
        { label: "Charges", href: "#charges" },
        { label: "Tracking", href: "#tracking" },
        { label: "International", href: "#international" },
      ]}
    >
      <Section id="timelines" kicker="Zones" title="Delivery timelines">
        <DataTable
          head={["Zone", "Coverage", "Working days"]}
          rows={[
            ["Metro Express", "Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad", "1–2 days"],
            ["Tier-1 cities", "Pune, Ahmedabad, Jaipur, Kochi, Chandigarh + 40 more", "2–3 days"],
            ["Tier-2 / Tier-3", "All serviceable district towns", "3–5 days"],
            ["North-East & remote", "Arunachal, Andaman, Ladakh, Lakshadweep", "5–8 days"],
          ]}
        />
        <p>
          Enter your pincode on any product page to see the exact promised window before you pay — it
          is computed from the same zone table above.
        </p>
      </Section>

      <Section id="charges" kicker="Pricing" title="Shipping charges">
        <InfoCards
          items={[
            { title: "Prepaid orders", body: "Free shipping on every prepaid order — no minimum cart value, ever.", badge: "Free" },
            { title: "COD orders", body: "Free above ₹999. Below that, a flat ₹49 cash-handling fee applies." },
            { title: "Express upgrade", body: "Next-day delivery in metros for ₹149 where the pincode supports it." },
            { title: "Bulk / gifting", body: "Orders above 10 units ship on a dedicated pallet with insurance included.", badge: "Insured" },
          ]}
        />
      </Section>

      <Section id="tracking" kicker="Visibility" title="Tracking your order">
        <Steps
          items={[
            { title: "Order confirmed", body: "Payment verified and your invoice PDF is generated instantly." },
            { title: "Packed", body: "Quality-checked, sealed and label printed at the nearest hub." },
            { title: "Shipped", body: "Handed to the courier — the tracking timeline goes live." },
            { title: "Out for delivery", body: "On the van with the rider's ETA, then Delivered with a timestamp." },
          ]}
        />
        <Callout title="Track without signing in">
          Use your order ID plus the email you checked out with on the Track order page. Signed-in
          customers see all of their orders with the same live timeline under My Orders.
        </Callout>
      </Section>

      <Section id="international" kicker="Beyond India" title="International shipping">
        <p>
          We ship to the UAE, Singapore, the UK and Australia through DHL Express — rates are
          calculated at checkout from actual dimensional weight. Duties and import taxes are payable
          by the customer at destination.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Transit time: 4–7 working days door to door.</li>
          <li>All shipments are insured for full declared value.</li>
          <li>Warranty is honoured through the local brand service network.</li>
        </ul>
      </Section>
    </PolicyPage>
  );
}
