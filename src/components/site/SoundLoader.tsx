import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./Logo";

const ACTS = [
  { short: "Initialize", title: "Booting audio core", sub: "DSP · 24-bit pipeline", to: 26 },
  { short: "Sync", title: "Fetching catalogue", sub: "160 hand-tuned products", to: 52 },
  { short: "Calibrate", title: "Tuning drivers", sub: "Adaptive ANC · spatial engine", to: 78 },
  { short: "Optimize", title: "Finalising soundstage", sub: "Reference calibration complete", to: 97 },
  { short: "Live", title: "Sound ready", sub: "Welcome to the listening room", to: 100 },
] as const;

export function SoundLoader({ label, onSkip }: { label?: string; onSkip?: () => void }) {
  const [pct, setPct] = useState(3);
  const [clock, setClock] = useState("00:00.0");

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      setPct((current) => (current >= 100 ? 100 : current + Math.max(1, Math.round((100 - current) / 11))));
      const elapsed = (performance.now() - start) / 1000;
      const seconds = Math.floor(elapsed);
      setClock(
        `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}.${Math.floor((elapsed % 1) * 10)}`,
      );
    }, 130);
    return () => window.clearInterval(id);
  }, []);

  const firstPendingAct = ACTS.findIndex((act) => pct <= act.to);
  const actIdx = firstPendingAct === -1 ? ACTS.length - 1 : firstPendingAct;
  const act = ACTS[actIdx];
  const headline = label ?? act.title;

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-screen w-screen items-center justify-center overflow-hidden bg-background"
      style={{ height: "100dvh" }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div aria-hidden className="sl-ember sl-ember-left pointer-events-none absolute" />
      <div aria-hidden className="sl-ember sl-ember-right pointer-events-none absolute" />
      <div aria-hidden className="sl-dot-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="sl-vignette pointer-events-none absolute inset-0" />
      <div aria-hidden className="sl-grain pointer-events-none absolute inset-0 opacity-[0.035]" />

      <div aria-hidden className="absolute left-5 top-5 h-4 w-4 border-l border-t border-border sm:left-12 sm:top-12" />
      <div aria-hidden className="absolute right-5 top-5 h-4 w-4 border-r border-t border-border sm:right-12 sm:top-12" />
      <div aria-hidden className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-border sm:bottom-12 sm:left-12" />
      <div aria-hidden className="absolute bottom-5 right-5 h-4 w-4 border-b border-r border-border sm:bottom-12 sm:right-12" />

      <header className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-12 sm:top-10">
        <span className="mono flex min-w-0 items-center gap-2.5 truncate text-[8px] font-medium tracking-[0.18em] text-muted-foreground sm:text-[9px] sm:tracking-[0.28em]">
          <i className="sl-status h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          PULSE AUDIO LABS // SYSTEM START
        </span>
        <span className="mono shrink-0 text-[9px] tracking-[0.16em] text-accent/80 tabular-nums sm:text-[10px]">
          T+{clock}
        </span>
      </header>

      <main className="relative flex w-full max-w-2xl -translate-y-2 flex-col items-center px-5 sm:px-10">
        <div className="sl-lockup flex select-none items-center gap-3 sm:gap-4">
          <div className="sl-logo-shell relative grid h-14 w-14 place-items-center rounded-full border border-accent/45 bg-surface/60 sm:h-16 sm:w-16">
            <span aria-hidden className="sl-logo-ring absolute inset-[-7px] rounded-full border border-accent/15" />
            <span aria-hidden className="sl-logo-ring sl-logo-ring-late absolute inset-[-13px] rounded-full border border-border/70" />
            <LogoMark size={42} animated className="relative sm:h-12 sm:w-12" />
          </div>
          <div>
            <div className="font-display text-3xl font-bold tracking-[0.04em] sm:text-4xl">
              PULSE<span className="text-accent">.</span>
            </div>
            <div className="mono mt-1 text-[7px] font-medium tracking-[0.38em] text-muted-foreground sm:text-[8px]">
              AUDIO LABS
            </div>
          </div>
        </div>

        <section className="mt-14 w-full sm:mt-18" aria-label="Loading progress">
          <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
            <div key={headline} className="sl-act min-w-0">
              <p className="mono truncate text-[9px] tracking-[0.2em] text-muted-foreground sm:text-[10px]">
                {label ? "Preparing your session" : act.sub}
              </p>
              <h2 className="mt-1.5 text-lg font-medium tracking-normal text-foreground sm:text-xl">
                {headline}
              </h2>
            </div>
            <span className="mono shrink-0 text-xs font-bold tracking-[0.12em] text-accent tabular-nums sm:text-sm">
              {String(pct).padStart(2, "0")}%
            </span>
          </div>

          <div className="sl-track relative h-0.5 w-full overflow-hidden rounded-full bg-border/80">
            <span
              className="sl-progress absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
            <span aria-hidden className="sl-shine" />
          </div>

          <ol className="mt-7 grid w-full grid-cols-5 gap-1 sm:mt-8 sm:gap-3">
            {ACTS.map((item, index) => {
              const done = pct >= item.to;
              const active = index === actIdx;
              return (
                <li
                  key={item.short}
                  className={`sl-stage flex min-w-0 flex-col items-center gap-2 text-center transition-opacity duration-500 ${
                    active ? "opacity-100" : done ? "opacity-60" : "opacity-30"
                  }`}
                >
                  <span className={`mono text-[8px] tracking-[0.12em] sm:text-[9px] ${active ? "text-accent" : "text-muted-foreground"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`mono max-w-full text-[7px] tracking-[0.03em] sm:text-[9px] sm:tracking-[0.1em] ${active ? "text-foreground" : "text-muted-foreground"}`}>
                    {item.short}
                  </span>
                  <span className={`h-1 w-1 rounded-full ${active ? "sl-stage-live bg-accent" : done ? "bg-accent/60" : "bg-border"}`} />
                </li>
              );
            })}
          </ol>
        </section>

        <p className="mono mt-9 text-center text-[8px] font-medium tracking-[0.24em] text-muted-foreground sm:mt-11 sm:text-[9px]">
          Building your acoustic profile
        </p>

        {onSkip ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            className="mono sl-skip mt-5 h-10 rounded-full border border-border bg-surface/40 px-6 text-[8px] font-medium tracking-[0.24em] text-muted-foreground hover:border-accent/45 hover:bg-accent/10 hover:text-foreground sm:mt-6"
          >
            Enter listening room
          </Button>
        ) : null}
      </main>

      <footer aria-hidden className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 sm:inset-x-12 sm:bottom-10">
        <span className="mono text-[7px] tracking-[0.12em] text-muted-foreground/70 sm:text-[9px] sm:tracking-[0.2em]">
          SR 96 KHZ · 24 BIT
        </span>
        <span className="mono text-right text-[7px] tracking-[0.12em] text-muted-foreground/70 tabular-nums sm:text-[9px] sm:tracking-[0.2em]">
          LAT {(18 - pct / 8).toFixed(1)} MS · BUF {String(Math.min(512, 64 + pct * 4)).padStart(3, "0")}
        </span>
      </footer>

      <style>{`
        .sl-ember { border-radius: 999px; filter: blur(110px); animation: sl-breathe 5s ease-in-out infinite; }
        .sl-ember-left { width: min(48rem, 75vw); height: min(48rem, 75vw); left: -20%; bottom: -30%; background: color-mix(in oklab, var(--color-accent) 15%, transparent); }
        .sl-ember-right { width: min(34rem, 55vw); height: min(34rem, 55vw); right: -14%; top: -22%; background: color-mix(in oklab, var(--color-muted) 45%, transparent); animation-delay: -2.5s; }
        .sl-dot-grid { opacity: .12; background-image: radial-gradient(var(--color-border) .7px, transparent .7px); background-size: 24px 24px; mask-image: radial-gradient(ellipse at center, black 15%, transparent 76%); }
        .sl-vignette { background: radial-gradient(ellipse at center, transparent 35%, color-mix(in oklab, var(--color-background) 88%, transparent) 100%); }
        .sl-grain { background-image: radial-gradient(var(--color-foreground) .45px, transparent .45px); background-size: 3px 3px; animation: sl-grain .7s steps(3) infinite; }
        .sl-lockup { animation: sl-rise 1s cubic-bezier(.16,1,.3,1) .12s both; }
        .sl-logo-shell { box-shadow: 0 0 40px color-mix(in oklab, var(--color-accent) 15%, transparent), inset 0 0 24px color-mix(in oklab, var(--color-accent) 8%, transparent); }
        .sl-logo-ring { animation: sl-ring 3.2s ease-out infinite; }
        .sl-logo-ring-late { animation-delay: 1.6s; }
        .sl-status, .sl-stage-live { animation: sl-status 1.5s ease-in-out infinite; }
        .sl-act { animation: sl-act-in .5s cubic-bezier(.16,1,.3,1) both; }
        .sl-progress { box-shadow: 0 0 14px color-mix(in oklab, var(--color-accent) 65%, transparent); }
        .sl-shine { position: absolute; inset-block: 0; width: 24%; background: linear-gradient(90deg, transparent, var(--color-foreground), transparent); opacity: .55; animation: sl-shine 1.8s ease-in-out infinite; }
        .sl-skip { animation: sl-rise .8s cubic-bezier(.16,1,.3,1) 1s both; }
        @keyframes sl-breathe { 0%,100% { opacity: .55; transform: scale(.96); } 50% { opacity: 1; transform: scale(1.04); } }
        @keyframes sl-rise { from { opacity: 0; transform: translateY(14px); filter: blur(5px); } to { opacity: 1; transform: none; filter: none; } }
        @keyframes sl-ring { 0% { transform: scale(.84); opacity: 0; } 30% { opacity: .7; } 100% { transform: scale(1.32); opacity: 0; } }
        @keyframes sl-status { 50% { opacity: .28; box-shadow: 0 0 12px var(--color-accent); } }
        @keyframes sl-act-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes sl-shine { from { transform: translateX(-120%); } to { transform: translateX(480%); } }
        @keyframes sl-grain { 0% { background-position: 0 0; } 33% { background-position: 1px 2px; } 66% { background-position: 2px 1px; } 100% { background-position: 0 0; } }
        @media (max-height: 650px) {
          .sl-lockup { transform: scale(.88); }
          main section { margin-top: 2rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sl-ember, .sl-grain, .sl-lockup, .sl-logo-ring, .sl-status, .sl-stage-live, .sl-act, .sl-shine, .sl-skip { animation: none !important; }
        }
      `}</style>
    </div>
  );
}