import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { getSoundMatch } from "@/lib/sound-match.functions";
type MatchResult = { summary: string; picks: { id: number; score: number; headline: string; reason: string }[] };
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/sound-match")({
  head: () => ({
    meta: [
      { title: "AI Sound Match — Find Your Earbuds | PULSE" },
      { name: "description", content: "Describe how you listen, your budget and priorities — our AI concierge picks the earbuds that fit you." },
      { property: "og:title", content: "AI Sound Match — PULSE" },
      { property: "og:description", content: "AI-powered earbud recommendations from the PULSE catalog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SoundMatch,
});

const USAGE = ["Commute", "Gym & running", "Office calls", "Gaming", "Travel & flights", "Studying", "Audiophile listening", "Sleep"];
const PRIORITIES = ["Noise cancellation", "Battery life", "Bass", "Call quality", "Comfort", "Low latency", "Water resistance", "Premium brand"];

function Chip({ on, label, toggle }: { on: boolean; label: string; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        on ? "border-accent bg-accent text-accent-foreground" : "border-border/60 bg-surface-2 text-muted-foreground hover:border-accent hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function SoundMatch() {
  const match = useServerFn(getSoundMatch);
  const [habits, setHabits] = useState("");
  const [budget, setBudget] = useState(5000);
  const [usage, setUsage] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);

  const flip = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await match({ data: { habits, budget, usage, priorities } });
      if (res.ok) setResult(res.result);
      else setError(res.error);
    } catch {
      setError("Couldn't reach the concierge. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">AI-powered · Sound Match</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">Tell us how you listen.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Describe your day, set a budget, pick what matters — our concierge scans the full catalog and picks four that fit you.
      </p>

      <form onSubmit={submit} className="mt-10 grid gap-8 rounded-3xl border border-border/60 bg-surface-1 p-6 sm:p-8">
        <div>
          <label htmlFor="habits" className="text-sm font-semibold">Your listening habits</label>
          <textarea
            id="habits"
            value={habits}
            onChange={(e) => setHabits(e.target.value.slice(0, 600))}
            rows={3}
            placeholder="e.g. 2-hour metro commute, lots of podcasts, Zoom calls in the afternoon, I love punchy bass…"
            className="mt-2 w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">Where you'll use them</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {USAGE.map((u) => <Chip key={u} label={u} on={usage.includes(u)} toggle={() => flip(usage, setUsage, u)} />)}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Top priorities</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRIORITIES.map((p) => <Chip key={p} label={p} on={priorities.includes(p)} toggle={() => flip(priorities, setPriorities, p)} />)}
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="budget" className="text-sm font-semibold">Budget</label>
            <span className="font-display text-xl font-bold text-accent">up to {inr(budget)}</span>
          </div>
          <input id="budget" type="range" min={1000} max={40000} step={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-3 w-full accent-[var(--accent)]" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Listening to your needs…" : "Find my match"}
        </button>
        {error && <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
      </form>

      {result && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Your matches</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{result.summary}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {result.picks.map((pick, i) => {
              const product = getProductById(pick.id);
              if (!product) return null;
              return (
                <div key={pick.id} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest">
                    <span className="text-accent">#{i + 1} · {pick.headline}</span>
                    <span className="rounded-full bg-surface-2 px-2 py-0.5">{Math.round(pick.score)}% fit</span>
                  </div>
                  <ProductCard product={product} />
                  <p className="text-sm text-muted-foreground">{pick.reason}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
