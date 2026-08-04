// Single source of truth for order status presentation.

export const ORDER_FLOW = [
  "confirmed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
] as const;

export type OrderStatus = typeof ORDER_FLOW[number];

export type StatusMeta = {
  key: OrderStatus;
  label: string;
  short: string;
  hint: string;
  step: number; // 0-based
  of: number;
  /** Tailwind classes for a filled chip. */
  chip: string;
  /** Tailwind classes for the dot / ring. */
  dot: string;
};

const META: Record<OrderStatus, Omit<StatusMeta, "key" | "step" | "of">> = {
  confirmed: {
    label: "Order confirmed",
    short: "Confirmed",
    hint: "Payment verified — we're preparing your items.",
    chip: "border-sky-500/40 bg-sky-500/10 text-sky-400",
    dot: "bg-sky-400 shadow-[0_0_10px_currentColor]",
  },
  packed: {
    label: "Packed",
    short: "Packed",
    hint: "Quality-checked, sealed and label printed.",
    chip: "border-violet-500/40 bg-violet-500/10 text-violet-400",
    dot: "bg-violet-400 shadow-[0_0_10px_currentColor]",
  },
  shipped: {
    label: "Shipped",
    short: "Shipped",
    hint: "In transit with our courier partner.",
    chip: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400 shadow-[0_0_10px_currentColor]",
  },
  out_for_delivery: {
    label: "Out for delivery",
    short: "Out for delivery",
    hint: "On the van — arriving today.",
    chip: "border-accent/50 bg-accent/15 text-accent",
    dot: "bg-accent shadow-[0_0_10px_currentColor]",
  },
  delivered: {
    label: "Delivered",
    short: "Delivered",
    hint: "Handed over. Enjoy your PULSE gear.",
    chip: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400 shadow-[0_0_10px_currentColor]",
  },
};

export function statusMeta(status: string): StatusMeta {
  const key = (ORDER_FLOW.includes(status as OrderStatus) ? status : "confirmed") as OrderStatus;
  return {
    key,
    step: ORDER_FLOW.indexOf(key),
    of: ORDER_FLOW.length,
    ...META[key],
  };
}

export function nextOrderStatus(status: string): OrderStatus | null {
  const i = ORDER_FLOW.indexOf(status as OrderStatus);
  return i >= 0 && i < ORDER_FLOW.length - 1 ? ORDER_FLOW[i + 1] : null;
}

export function statusLabel(status: string): string {
  return statusMeta(status).label;
}
