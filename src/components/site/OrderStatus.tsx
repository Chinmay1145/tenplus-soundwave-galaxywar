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
