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
  const featured = ["Apple", "Sony", "Bose", "Sennheiser", "JBL", "Nothing", "Beats", "Marshall"].filter((b) =>
    BRANDS.includes(b),
  );

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 460px at 50% -10%, oklch(0.65 0.24 25 / 0.18), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
          <div className="flex items-center gap-3">
            <LogoMark size={28} />
            <div className="mono text-accent">— Brands</div>
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">
            The labels that <span className="shimmer-text">shaped sound.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {BRANDS.length} iconic audio brands, one storefront. Tap any tile to see the lineup.
          </p>

          {/* Featured marquee */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card/50 py-5 backdrop-blur">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
            <div className="flex items-center gap-10 overflow-x-auto px-8 sm:justify-center">
              {featured.map((brand) => {
                const domain = DOMAINS[brand];
                return (
                  <Link
                    key={`f-${brand}`}
                    to="/shop"
                    search={{ brand }}
                    className="group flex shrink-0 items-center gap-2 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    title={brand}
                  >
                    {domain ? (
                      <img
                        src={`https://logo.clearbit.com/${domain}?size=128`}
                        alt={brand}
                        loading="lazy"
                        className="h-8 w-8 rounded bg-white object-contain p-1"
                      />
                    ) : null}
                    <span className="font-display text-sm font-bold tracking-tight">{brand}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
