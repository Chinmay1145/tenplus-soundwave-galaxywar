import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { MessageSquare, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PRODUCTS, getProduct } from "@/data/products";
import { blendedRating, refreshReviewSummary, reviewSchema, useReviewSummary, type Review } from "@/lib/reviews";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reviews")({
  validateSearch: z.object({ product: z.coerce.number().int().optional() }),
  head: () => ({
    meta: [
      { title: "Shopper Reviews — PULSE" },
      { name: "description", content: "Read honest ratings from PULSE shoppers and share your own review of any earbuds or headphones." },
      { property: "og:title", content: "Shopper Reviews — PULSE" },
      { property: "og:description", content: "Real ratings and comments from listeners on every PULSE product." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewsPage,
});

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${size} ${i <= Math.round(value) ? "fill-accent text-accent" : "text-muted-foreground/40"}`} />
      ))}
    </span>
  );
}

function ReviewsPage() {
  const { product: productId } = Route.useSearch();
  const navigate = useNavigate({ from: "/reviews" });
  const product = productId ? getProduct(productId) : undefined;
  const summary = useReviewSummary();
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => !s || `${p.name} ${p.brand}`.toLowerCase().includes(s)).slice(0, 60);
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mono text-accent">— Reviews</div>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">What listeners say</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Pick a product to read shopper ratings or leave your own.</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-border/60 bg-card p-4">
          <label className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
              maxLength={60}
              className="h-11 w-full bg-transparent text-base outline-none sm:text-sm"
            />
          </label>
          <ul className="mt-3 max-h-[60vh] space-y-1 overflow-y-auto">
            {list.map((p) => {
              const live = summary[p.id];
              const active = p.id === productId;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => navigate({ search: { product: p.id } })}
                    className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${active ? "bg-accent/15" : "hover:bg-surface"}`}
                  >
                    <img src={p.image} alt="" loading="lazy" className="h-10 w-10 rounded-md object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{p.name}</span>
                      <span className="mono text-[10px] text-muted-foreground">{p.brand}</span>
                    </span>
                    {live && <span className="mono text-[10px] text-accent">{live.count} new</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section>
          {product ? (
            <ProductReviews key={product.id} productId={product.id} />
          ) : (
            <div className="grid h-full min-h-72 place-items-center rounded-2xl border border-dashed border-border/60 p-10 text-center">
              <div>
                <MessageSquare className="mx-auto h-8 w-8 text-accent" />
                <p className="mt-3 text-muted-foreground">Choose a product from the list to see its reviews.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ProductReviews({ productId }: { productId: number }) {
  const product = getProduct(productId)!;
  const { user } = useAuth();
  const summary = useReviewSummary();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (error) toast.error("Couldn't load reviews");
    setReviews((data as Review[]) ?? []);
  };
  useEffect(() => {
    void load();
  }, [productId]);

  const mine = reviews?.find((r) => r.user_id === user?.id);
  useEffect(() => {
    if (mine) {
      setRating(mine.rating);
      setTitle(mine.title ?? "");
      setComment(mine.comment);
    }
  }, [mine?.id]);

  const stats = blendedRating(product.rating, product.reviews, summary[productId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = reviewSchema.safeParse({ rating, title, comment });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const author =
      (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email?.split("@")[0] || "Listener";
    const payload = {
      product_id: productId,
      user_id: user.id,
      author_name: author.slice(0, 60),
      rating: parsed.data.rating,
      title: parsed.data.title || null,
      comment: parsed.data.comment,
    };
    const { error } = mine
      ? await supabase.from("product_reviews").update(payload).eq("id", mine.id)
      : await supabase.from("product_reviews").insert(payload);
    setBusy(false);
    if (error) return toast.error("Couldn't save your review", { description: error.message });
    toast.success(mine ? "Review updated" : "Thanks for your review!", { description: product.name, icon: "⭐" });
    await Promise.all([load(), refreshReviewSummary()]);
  };

  const remove = async () => {
    if (!mine) return;
    const { error } = await supabase.from("product_reviews").delete().eq("id", mine.id);
    if (error) return toast.error("Couldn't delete review");
    setRating(0); setTitle(""); setComment("");
    toast("Review removed");
    await Promise.all([load(), refreshReviewSummary()]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-5 sm:flex-row sm:items-center">
        <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
        <div className="flex-1">
          <div className="mono text-[11px] text-muted-foreground">{product.brand}</div>
          <Link to="/product/$id" params={{ id: String(product.id) }} className="font-display text-2xl font-bold hover:text-accent">
            {product.name}
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <Stars value={stats.rating} />
            <span className="font-display text-lg font-semibold">{stats.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">{stats.count.toLocaleString("en-IN")} ratings</span>
          </div>
        </div>
      </div>

      {user ? (
        <form onSubmit={submit} className="rounded-2xl border border-border/60 bg-card p-5">
          <h2 className="font-display text-lg font-semibold">{mine ? "Edit your review" : "Write a review"}</h2>
          <div className="mt-3 flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                type="button"
                key={i}
                aria-label={`${i} star${i > 1 ? "s" : ""}`}
                onMouseEnter={() => setHover(i)}
                onClick={() => setRating(i)}
                className="grid h-11 w-11 place-items-center"
              >
                <Star className={`h-7 w-7 transition-colors ${i <= (hover || rating) ? "fill-accent text-accent" : "text-muted-foreground/40"}`} />
              </button>
            ))}
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            placeholder="Headline (optional)"
            className="mt-3 h-11 w-full rounded-lg border border-border/60 bg-background px-3 text-base outline-none focus:border-accent sm:text-sm"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="How do they sound, fit and last?"
            className="mt-3 w-full rounded-lg border border-border/60 bg-background p-3 text-base outline-none focus:border-accent sm:text-sm"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="mono text-[10px] text-muted-foreground">{comment.length}/1000</span>
            <div className="flex gap-2">
              {mine && (
                <Button type="button" variant="outline" onClick={remove}>
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              )}
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : mine ? "Update review" : "Post review"}</Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card p-5 text-sm">
          <Link to="/auth" search={{ redirect: `/reviews?product=${productId}` }} className="font-semibold text-accent hover:underline">
            Sign in
          </Link>{" "}
          to leave a rating and comment.
        </div>
      )}

      <div className="space-y-3">
        {reviews === null ? (
          <p className="text-sm text-muted-foreground">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
            No shopper reviews yet — be the first.
          </p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 font-display font-bold text-accent">
                    {r.author_name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">
                      {r.author_name} {r.user_id === user?.id && <span className="mono text-[10px] text-accent">· You</span>}
                    </div>
                    <div className="mono text-[10px] text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <Stars value={r.rating} />
              </div>
              {r.title && <h3 className="mt-3 font-semibold">{r.title}</h3>}
              <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{r.comment}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
