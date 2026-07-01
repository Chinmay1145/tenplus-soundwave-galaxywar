import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, PRODUCTS } from "@/data/products";
import { LogoMark } from "@/components/site/Logo";

const BRAND_TINT: Record<string, string> = {
  Apple: "#a1a1a6", Sony: "#000000", Bose: "#000000", Sennheiser: "#0033A0",
  JBL: "#FF6600", Beats: "#E61E26", Nothing: "#ff3b30", Samsung: "#1428A0",
  OnePlus: "#EB0028", Realme: "#FFC900", Jabra: "#FF8200", Skullcandy: "#000000",
  Soundcore: "#00AEEF", Marshall: "#c0392b",
};

const DOMAINS: Record<string, string> = {
  Apple: "apple.com",
  Sony: "sony.com",
  Bose: "bose.com",
  Sennheiser: "sennheiser.com",
  JBL: "jbl.com",
  Beats: "beatsbydre.com",
  Nothing: "nothing.tech",
  Samsung: "samsung.com",
  OnePlus: "oneplus.com",
  Realme: "realme.com",
  Jabra: "jabra.com",
  Skullcandy: "skullcandy.com",
  Soundcore: "soundcore.com",
  Marshall: "marshallheadphones.com",
};

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Shop by Brand — PULSE" },
      { name: "description", content: "Browse premium audio brands — Apple, Sony, Bose, Sennheiser, JBL, Nothing and more, all in one place." },
      { property: "og:title", content: "Shop by Brand — PULSE" },
      { property: "og:description", content: "Curated brands. Iconic sound. Shop the names that shaped audio." },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <LogoMark size={28} />
        <div className="mono text-accent">— Brands</div>
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Shop by brand.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        The labels that define modern audio. Tap any brand to see their lineup on PULSE.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {BRANDS.map((brand) => {
          const domain = DOMAINS[brand];
          const count = PRODUCTS.filter((p) => p.brand === brand).length;
          const tint = BRAND_TINT[brand] ?? "#e11d2f";
          const logo = domain
            ? `https://logo.clearbit.com/${domain}?size=256`
            : null;
          return (
            <Link
              key={brand}
              to="/shop"
              search={{ brand }}
              className="group relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-2xl"
              style={{ ["--tint" as string]: tint } as React.CSSProperties}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(500px 260px at 50% 0%, ${tint}22, transparent 70%)`,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-px left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${tint}, transparent)` }}
              />
              <div
                className="relative grid h-20 w-20 place-items-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={`${brand} logo`}
                    loading="lazy"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "grid";
                    }}
                  />
                ) : null}
                <span
                  className="hidden h-full w-full place-items-center font-display text-2xl font-bold"
                  style={{ display: logo ? "none" : "grid", color: tint }}
                >
                  {brand.slice(0, 2)}
                </span>
              </div>
              <div className="text-center">
                <div className="font-display text-base font-bold tracking-tight">{brand}</div>
                <div className="mono mt-0.5 text-[10px] text-muted-foreground">
                  {count} {count === 1 ? "product" : "products"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
