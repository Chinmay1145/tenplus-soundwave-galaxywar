import { Check, CircleDot, MapPin, PackageCheck, Truck } from "lucide-react";
import { ORDER_FLOW, statusMeta } from "@/lib/order-status";

const ICONS = [CircleDot, PackageCheck, Truck, MapPin, Check];

/** Colour-coded status pill — same visual language everywhere. */
export function StatusBadge({
  status,
  size = "md",
}: {
  status: string;
  size?: "sm" | "md";
}) {
  const m = statusMeta(status);
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-[0.12em] ${m.chip} ${
        size === "sm" ? "px-2.5 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.short}
    </span>
  );
}

/**
 * Compact 5-step strip: instantly shows whether an order is confirmed,
 * packed, shipped, out for delivery or delivered.
 */
export function StatusStrip({ status, labels = true }: { status: string; labels?: boolean }) {
  const m = statusMeta(status);
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {ORDER_FLOW.map((s, i) => {
          const done = i <= m.step;
          const current = i === m.step;
          return (
            <div key={s} className="flex flex-1 items-center gap-1.5">
              <span
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  done ? "bg-accent" : "bg-border/70"
                } ${current ? "shadow-[0_0_10px_oklch(0.65_0.24_25/0.7)]" : ""}`}
              />
            </div>
          );
        })}
      </div>
      {labels && (
        <div className="mono mt-2 flex justify-between gap-1 text-[8px] uppercase tracking-[0.14em]">
          {ORDER_FLOW.map((s, i) => {
            const meta = statusMeta(s);
            const Icon = ICONS[i];
            const done = i <= m.step;
            return (
              <span
                key={s}
                className={`flex min-w-0 items-center gap-1 ${
                  i === m.step ? "text-accent" : done ? "text-foreground/70" : "text-muted-foreground/50"
                }`}
              >
                <Icon className="h-2.5 w-2.5 shrink-0" />
                <span className="hidden truncate sm:inline">{meta.short}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** One-line human sentence for the current state. */
export function StatusHint({ status }: { status: string }) {
  const m = statusMeta(status);
  return (
    <p className="text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">Step {m.step + 1} of {m.of}</span> · {m.hint}
    </p>
  );
}

const STAGE_DETAIL: Record<string, { what: string; you: string }> = {
  confirmed: {
    what: "Payment authorised and the order was pushed to our Mumbai fulfilment centre.",
    you: "Nothing to do — you can still change the address until we pack it.",
  },
  packed: {
    what: "Serial numbers logged, 12-point QC passed, box sealed with a tamper strip.",
    you: "Check the tamper strip is intact at delivery before you accept the parcel.",
  },
  shipped: {
    what: "Handed to our courier partner and moving through the sort hubs.",
    you: "Live courier scans appear on the timeline below every few hours.",
  },
  out_for_delivery: {
    what: "On the delivery van with the rider for your pincode.",
    you: "Keep your phone handy — the rider calls before arriving.",
  },
  delivered: {
    what: "Parcel handed over and the delivery signature was captured.",
    you: "15-day returns and full Indian warranty start from today.",
  },
};

/** Per-stage detail cards: what happened, what it means for you, and when. */
export function StageCards({
  status,
  createdAt,
}: {
  status: string;
  createdAt?: string;
}) {
  const m = statusMeta(status);
  const base = createdAt ? new Date(createdAt).getTime() : Date.now();
  const stamp = (i: number) =>
    new Date(base + i * 22 * 3600 * 1000).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {ORDER_FLOW.map((s, i) => {
        const meta = statusMeta(s);
        const Icon = ICONS[i];
        const done = i < m.step;
        const current = i === m.step;
        const detail = STAGE_DETAIL[s];
        return (
          <li
            key={s}
            className={`relative overflow-hidden rounded-2xl border p-4 transition-colors ${
              current
                ? "border-accent/60 bg-accent/[0.07] shadow-[0_0_0_1px_oklch(0.65_0.24_25/0.25),0_18px_40px_-28px_oklch(0.65_0.24_25/0.8)]"
                : done
                  ? "border-border/70 bg-card"
                  : "border-border/40 bg-card/50"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-2 text-sm font-semibold ${
                  current ? "text-accent" : done ? "text-foreground" : "text-muted-foreground/70"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                    current
                      ? "border-accent bg-accent/20 text-accent"
                      : done
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-border text-muted-foreground/60"
                  }`}
                >
                  {done ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                </span>
                {meta.label}
              </span>
              <span className="mono shrink-0 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {i + 1}/{m.of}
              </span>
            </div>
            <p
              className={`mt-2.5 text-[13px] leading-5 ${
                done || current ? "text-muted-foreground" : "text-muted-foreground/60"
              }`}
            >
              {detail.what}
            </p>
            {(done || current) && (
              <p className="mt-2 text-[12px] leading-5 text-foreground/70">
                <span className="mono text-[9px] uppercase tracking-[0.16em] text-accent">Tip · </span>
                {detail.you}
              </p>
            )}
            <div className="mono mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.16em]">
              <span className={done || current ? "text-foreground/60" : "text-muted-foreground/40"}>
                {done ? stamp(i) : current ? stamp(i) : "Pending"}
              </span>
              <span
                className={
                  current
                    ? "text-accent"
                    : done
                      ? "text-emerald-400"
                      : "text-muted-foreground/40"
                }
              >
                {current ? "In progress" : done ? "Complete" : "Upcoming"}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
