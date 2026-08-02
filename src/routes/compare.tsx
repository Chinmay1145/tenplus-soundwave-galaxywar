import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Scale, Star, Trash2, X, Sparkles, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { getProduct } from "@/data/products";
import { inr } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare audio gear side by side — PULSE" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "Compare up to four PULSE products across price, rating, battery and full specs.",
      },
    ],
  }),
  component: Compare,
});

function Compare() {
  const { compare, toggleCompare, addToCart } = useStore();
  const [diffOnly, setDiffOnly] = useState(false);

  const items = compare
    .map((id) => getProduct(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  const allSpecs = useMemo(
    () => Array.from(new Set(items.flatMap((i) => Object.keys(i.specs)))),
    [items],
  );

  const specs = useMemo(() => {
    if (!diffOnly) return allSpecs;
    return allSpecs.filter((k) => {
      const vals = items.map((p) => p.specs[k] ?? "—");
      return new Set(vals).size > 1;
    });
  }, [allSpecs, items, diffOnly]);

  const cheapest = items.length > 1 ? Math.min(...items.map((p) => p.price)) : -1;
  const bestRated = items.length > 1 ? Math.max(...items.map((p) => p.rating)) : -1;

  if (items.length === 0) {
    return (
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 0%, var(--color-accent), transparent 70%)" }}
        />
        <span className="grid mx-auto h-14 w-14 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
          <Scale className="h-6 w-6" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Compare up to 4 products</h1>
        <p className="mt-3 text-muted-foreground">
          Tap the scale icon on any product card to line them up spec-for-spec.
        </p>
        <Link
          to="/shop"
          className="btn-magnetic mt-8 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
        >
          Browse collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mono text-accent">— Compare · {items.length}/4</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Side by side</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {specs.length} spec {specs.length === 1 ? "row" : "rows"} · winners highlighted in accent
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setDiffOnly((v) => !v)}
            className={`mono rounded-full border px-4 py-2 text-[10px] tracking-[0.2em] transition-colors ${
              diffOnly
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-surface-2 text-muted-foreground hover:text-foreground"
            }`}
          >
            {diffOnly ? "SHOWING DIFFERENCES" : "SHOW DIFFERENCES ONLY"}
          </button>
          <button
            onClick={() => {
              items.forEach((p) => toggleCompare(p.id));
              toast("Comparison cleared");
            }}
            className="mono inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-[10px] tracking-[0.2em] text-muted-foreground hover:text-accent"
          >
            <Trash2 className="h-3 w-3" /> CLEAR ALL
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-4">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="mono w-44 text-left text-muted-foreground" />
              {items.map((p) => {
                const isCheapest = p.price === cheapest;
                const isTopRated = p.rating === bestRated;
                return (
                  <th key={p.id} className="px-2 text-left align-top">
                    <div
                      className={`relative overflow-hidden rounded-2xl border bg-card p-4 transition-colors ${
                        isCheapest ? "border-accent/60" : "border-border/60"
                      }`}
                    >
                      {isCheapest && (
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-2xl"
                          style={{
                            background: "radial-gradient(circle, var(--color-accent), transparent 70%)",
                          }}
                        />
                      )}
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-surface-2 text-muted-foreground hover:border-accent hover:text-accent"
                        aria-label={`Remove ${p.name} from comparison`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <Link to="/product/$id" params={{ id: String(p.id) }} className="relative block">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="mx-auto aspect-square w-40 rounded-xl object-cover"
                        />
                        <div className="mono mt-3 text-muted-foreground">{p.brand}</div>
                        <div className="font-display text-base font-bold leading-tight">{p.name}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-display text-lg">{inr(p.price)}</span>
                          {p.mrp > p.price && (
                            <span className="text-xs text-muted-foreground line-through">{inr(p.mrp)}</span>
                          )}
                        </div>
                      </Link>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {isCheapest && (
                          <span className="mono inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] text-accent">
                            <Sparkles className="h-2.5 w-2.5" /> BEST PRICE
                          </span>
                        )}
                        {isTopRated && (
                          <span className="mono inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400">
                            <Star className="h-2.5 w-2.5" /> TOP RATED
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          addToCart(p.id);
                          toast.success(`${p.name} added to cart`, {
                            description: inr(p.price),
                          });
                        }}
                        className="btn-magnetic mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground py-2 text-xs font-semibold text-background"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-sm">
            <Row label="Price">
              {items.map((p) => (
                <Cell key={p.id} highlight={p.price === cheapest}>
                  <span className="font-display text-base">{inr(p.price)}</span>
                  {p.discount > 0 && (
                    <span className="mono ml-2 text-[10px] text-accent">-{p.discount}%</span>
                  )}
                </Cell>
              ))}
            </Row>
            <Row label="Rating">
              {items.map((p) => (
                <Cell key={p.id} highlight={p.rating === bestRated}>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {p.rating.toFixed(1)}
                    <span className="text-xs text-muted-foreground">({p.reviews})</span>
                  </span>
                </Cell>
              ))}
            </Row>
            <Row label="Category">
              {items.map((p) => (
                <Cell key={p.id}>{p.category.toUpperCase()}</Cell>
              ))}
            </Row>
            <Row label="Battery">
              {items.map((p) => (
                <Cell key={p.id}>{p.batteryLife}</Cell>
              ))}
            </Row>
            <Row label="Bluetooth">
              {items.map((p) => (
                <Cell key={p.id}>{p.bluetooth}</Cell>
              ))}
            </Row>
            <Row label="Active ANC">
              {items.map((p) => (
                <Cell key={p.id} highlight={p.anc}>
                  {p.anc ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <Check className="h-3.5 w-3.5" /> Yes
                    </span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </Cell>
              ))}
            </Row>
            <Row label="Availability">
              {items.map((p) => (
                <Cell key={p.id}>
                  {p.inStock ? (
                    <span className="text-emerald-400">In stock</span>
                  ) : (
                    <span className="text-muted-foreground">Sold out</span>
                  )}
                </Cell>
              ))}
            </Row>
            <Row label="Colourways">
              {items.map((p) => (
                <Cell key={p.id}>
                  <span className="flex flex-wrap items-center gap-1.5">
                    {p.colors.slice(0, 5).map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ background: c.hex }}
                      />
                    ))}
                  </span>
                </Cell>
              ))}
            </Row>

            <tr>
              <td colSpan={items.length + 1} className="pt-6">
                <div className="mono text-[10px] tracking-[0.25em] text-accent">— FULL SPECIFICATIONS</div>
              </td>
            </tr>

            {specs.length === 0 && (
              <tr>
                <td colSpan={items.length + 1} className="rounded-xl bg-card px-4 py-6 text-center text-muted-foreground">
                  These products share identical specifications.
                </td>
              </tr>
            )}

            {specs.map((spec) => {
              const vals = items.map((p) => p.specs[spec] ?? "—");
              const differs = new Set(vals).size > 1;
              return (
                <Row key={spec} label={spec} accentLabel={differs}>
                  {items.map((p, i) => (
                    <Cell key={p.id}>{vals[i]}</Cell>
                  ))}
                </Row>
              );
            })}

            <Row label="Features">
              {items.map((p) => (
                <Cell key={p.id}>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Cell>
              ))}
            </Row>
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-surface p-5">
        <p className="text-sm text-muted-foreground">
          Still torn? Every PULSE order ships with 30-day free returns and a 2-year warranty.
        </p>
        <Link
          to="/shop"
          className="mono rounded-full border border-border bg-surface-2 px-4 py-2 text-[10px] tracking-[0.2em] hover:border-accent hover:text-accent"
        >
          ADD ANOTHER PRODUCT
        </Link>
      </div>
    </div>
  );
}

function Row({
  label,
  accentLabel,
  children,
}: {
  label: string;
  accentLabel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <td
        className={`mono py-3 pr-3 align-top ${accentLabel ? "text-accent" : "text-muted-foreground"}`}
      >
        {label}
      </td>
      {children}
    </tr>
  );
}

function Cell({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <td
      className={`rounded-xl px-3 py-3 align-top ${
        highlight ? "bg-accent/10 ring-1 ring-inset ring-accent/30" : "bg-card"
      }`}
    >
      {children}
    </td>
  );
}
