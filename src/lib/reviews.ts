import { useEffect, useSyncExternalStore } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export type Review = {
  id: string;
  product_id: number;
  user_id: string;
  author_name: string;
  rating: number;
  title: string | null;
  comment: string;
  created_at: string;
};

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Pick a star rating").max(5),
  title: z.string().trim().max(100, "Keep the title under 100 characters"),
  comment: z
    .string()
    .trim()
    .min(3, "Write at least a few words")
    .max(1000, "Keep it under 1000 characters"),
});

type Summary = Record<number, { sum: number; count: number }>;

let summary: Summary = {};
let loaded = false;
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function refreshReviewSummary() {
  loading = (async () => {
    const { data } = await supabase.from("product_reviews").select("product_id, rating").limit(5000);
    const next: Summary = {};
    for (const r of data ?? []) {
      const s = (next[r.product_id] ??= { sum: 0, count: 0 });
      s.sum += r.rating;
      s.count += 1;
    }
    summary = next;
    loaded = true;
    emit();
  })();
  return loading;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Shopper review stats for all products (fetched once, shared). */
export function useReviewSummary() {
  useEffect(() => {
    if (!loaded && !loading) void refreshReviewSummary();
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => summary,
    () => summary,
  );
}

/** Blend catalogue rating with live shopper reviews. */
export function blendedRating(base: number, baseCount: number, live?: { sum: number; count: number }) {
  if (!live || live.count === 0) return { rating: base, count: baseCount, live: 0 };
  const count = baseCount + live.count;
  return { rating: (base * baseCount + live.sum) / count, count, live: live.count };
}
