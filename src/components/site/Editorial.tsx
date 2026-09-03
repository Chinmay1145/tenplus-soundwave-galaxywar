import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll-triggered reveal (moderate motion register, respects reduced-motion). */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ed-reveal ${shown ? "ed-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}

/**
 * Editorial section masthead: hairline rule, mono kicker, oversized index numeral
 * and a display headline with generous margins.
 */
export function SectionMast({
  index,
  kicker,
  title,
  standfirst,
  align = "left",
  aside,
}: {
  index?: string;
  kicker: string;
  title: ReactNode;
  standfirst?: string;
  align?: "left" | "wide";
  aside?: ReactNode;
}) {
  return (
    <div className="ed-rule flex-col items-stretch gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className={align === "wide" ? "max-w-4xl" : "max-w-2xl"}>
        <div className="mono flex items-baseline gap-3 text-[10px] uppercase tracking-[0.24em] text-accent">
          {index && <span className="ed-numeral text-3xl sm:text-4xl">{index}</span>}
          <span>{kicker}</span>
        </div>
        <h2 className="mt-4 font-display text-[2.1rem] font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {standfirst && (
          <p className="mt-4 max-w-xl border-l border-accent/50 pl-4 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {standfirst}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0 sm:pb-2">{aside}</div>}
    </div>
  );
}

/** Thin labelled divider used between editorial bands. */
export function BandRule({ label }: { label: string }) {
  return (
    <div className="mono flex items-center gap-4 border-t border-border/60 pt-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
      <span className="text-accent">—</span>
      <span>{label}</span>
      <span className="h-px flex-1 bg-border/60" />
    </div>
  );
}
