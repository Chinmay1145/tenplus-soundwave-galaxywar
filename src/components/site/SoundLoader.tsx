import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./Logo";

/** Cinematic acts — each act owns a headline, a subline and a progress ceiling. */
const ACTS = [
  { title: "Booting audio core", sub: "Initialising DSP · 24-bit pipeline", to: 26 },
  { title: "Fetching catalogue", sub: "160 hand-tuned products", to: 52 },
  { title: "Tuning drivers", sub: "Adaptive ANC · spatial engine", to: 78 },
  { title: "Finalising soundstage", sub: "Reference calibration complete", to: 97 },
  { title: "Sound ready", sub: "Welcome to the listening room", to: 100 },
] as const;

export function SoundLoader({ label, onSkip }: { label?: string; onSkip?: () => void }) {
  const [pct, setPct] = useState(3);
  const [clock, setClock] = useState("00:00.0");

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + Math.max(1, Math.round((100 - p) / 11))));
      const t = (performance.now() - start) / 1000;
      const s = Math.floor(t);
      setClock(`${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}.${Math.floor((t % 1) * 10)}`);
    }, 130);
    return () => clearInterval(id);
  }, []);

  const actIdx = Math.min(ACTS.length - 1, ACTS.findIndex((a) => pct <= a.to) === -1 ? ACTS.length - 1 : ACTS.findIndex((a) => pct <= a.to));
  const act = ACTS[actIdx];
  const headline = label ?? act.title;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background"
      style={{ width: "100vw", height: "100dvh", minHeight: "100vh" }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* calibrated colour field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sl-wash"
        style={{
          background:
            "radial-gradient(closest-side at 50% 46%, oklch(0.65 0.24 25 / 0.14), transparent 84%)",
        }}
      />
      {/* fine grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.65 0.24 25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.24 25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(closest-side at 50% 50%, black, transparent 82%)",
        }}
      />
      {/* sweeping scanline */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="sl-scan" />
      </div>
      {/* vignette + film grain for cinematic depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 40%, oklch(0 0 0 / 0.55) 100%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 sl-grain opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-10 sm:top-8">
        <span className="mono flex min-w-0 items-center gap-3 truncate text-[9px] font-bold tracking-[0.22em] text-muted-foreground sm:text-[10px] sm:tracking-[0.3em]">
          <i className="sl-status h-1.5 w-1.5 shrink-0 bg-accent" />
          PULSE AUDIO LABS // STARTUP
        </span>
        <span className="mono shrink-0 text-[10px] tracking-[0.2em] text-accent/80 tabular-nums">T+{clock}</span>
      </div>
      {/* bottom HUD readouts */}
      <div aria-hidden className="pointer-events-none absolute inset-x-10 bottom-8 hidden items-center justify-between gap-3 sm:flex">
        <span className="mono text-[10px] tracking-[0.2em] text-muted-foreground">SR 96 kHz · BIT 24 · LAT {(18 - pct / 8).toFixed(1)} ms</span>
        <span className="mono text-[10px] tracking-[0.2em] text-muted-foreground">BUFFER {String(Math.min(512, 64 + pct * 4)).padStart(3, "0")}</span>
      </div>


      <div className="relative flex w-full max-w-xl flex-col items-center px-5 py-16 sm:px-8">
        {/* logo lockup */}
        <div className="sl-lockup relative flex flex-col items-center px-10 py-6 sm:px-12 sm:py-8">
          <span aria-hidden className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-accent" />
          <span aria-hidden className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-accent/20" />
          <span aria-hidden className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-accent/20" />
          <span aria-hidden className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-accent" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full border-2 border-accent sm:h-24 sm:w-24">
            <span aria-hidden className="sl-orbit absolute inset-[-7px] rounded-full border border-accent/20" />
            <LogoMark size={55} animated className="relative sm:h-16 sm:w-16" />
          </div>
          <div className="mt-5 font-display text-3xl font-bold tracking-[0.22em] sm:mt-6 sm:text-5xl">
            PULSE<span className="text-accent">.</span>
          </div>
          <div className="mono mt-2 text-[9px] font-bold tracking-[0.55em] text-accent/60">AUDIO LABS</div>
        </div>

        {/* equaliser */}
        <div className="mt-7 flex h-9 items-center gap-1.5 sm:mt-9 sm:h-12" aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <span
              key={i}
              className="sl-eqbar"
              style={{ animationDelay: `${i * 0.09}s`, animationDuration: `${0.9 + (i % 4) * 0.14}s` }}
            />
          ))}
        </div>


        {/* act headline with crossfade */}
        <div className="mt-5 min-h-12 text-center sm:mt-7">
          <div key={headline} className="sl-act">
            <div className="mono text-[11px] tracking-[0.32em] text-foreground/85 sm:tracking-[0.4em]">
              {headline.toUpperCase()}
            </div>
            <div className="mono mt-1.5 text-[10px] tracking-[0.2em] text-muted-foreground">
              {(label ? "PREPARING YOUR SESSION" : act.sub).toUpperCase()}
            </div>
          </div>
        </div>

        {/* progress */}
        <div className="mt-5 w-full">
          <div className="mono mb-3 flex items-center justify-between text-[9px] font-bold tracking-[0.22em] text-muted-foreground">
            <span>ACT {actIdx + 1} / {ACTS.length}</span>
            <span className="text-accent">{pct}%</span>
          </div>
          <div className="relative h-1 w-full overflow-hidden bg-border/60">
            <span
              className="absolute inset-y-0 left-0 transition-[width] duration-500 ease-out"
              style={{
                width: `${pct}%`,
                background:
                  "linear-gradient(90deg, oklch(0.45 0.20 25), var(--color-accent) 60%, oklch(0.86 0.16 25))",
                boxShadow: "0 0 12px oklch(0.65 0.24 25 / 0.55)",
              }}
            />
            <span aria-hidden className="sl-shine" />
          </div>
        </div>

        {/* act ticks */}
        <ul className="mt-4 grid w-full grid-cols-5 gap-1.5 sm:gap-2" aria-hidden>
          {ACTS.map((a, i) => {
            const done = pct >= a.to;
            const live = i === actIdx && !done;
            return (
              <li key={a.title} className="flex flex-col items-center gap-1.5">
                <span
                  className={`h-0.5 w-full transition-all duration-500 ${
                    done
                      ? "bg-accent shadow-[0_0_10px_oklch(0.65_0.24_25/0.8)]"
                      : live
                        ? "bg-accent/60"
                        : "bg-border/70"
                  }`}
                />
                <span
                  className={`mono max-w-full truncate text-[8px] font-bold tracking-[0.04em] transition-colors sm:tracking-[0.1em] ${
                    done ? "text-accent" : live ? "text-foreground/70" : "text-muted-foreground/45"
                  }`}
                >
                  {a.title.split(" ")[0].toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>

        {onSkip ? (
          <Button
            type="button"
            variant="outline"
            onClick={onSkip}
            className="mono sl-skip mt-7 h-11 rounded-none border-accent/30 bg-surface/40 px-8 text-[9px] font-bold tracking-[0.36em] text-foreground hover:border-accent/60 hover:bg-accent/10 hover:text-accent sm:mt-10"
          >
            TAP TO ENTER
          </Button>
        ) : null}
      </div>

      <style>{`
        .sl-wash { animation: sl-breathe 5s ease-in-out infinite; }
        @keyframes sl-breathe { 0%,100% { opacity: .75; } 50% { opacity: 1; } }


        .sl-lockup { animation: sl-rise 1.1s cubic-bezier(.16,1,.3,1) .25s both; }
        .sl-status { animation: sl-status 1.5s ease-in-out infinite; }
        @keyframes sl-status { 50% { opacity: .25; box-shadow: 0 0 14px var(--color-accent); } }
        .sl-orbit { animation: sl-orbit 8s linear infinite; }
        @keyframes sl-orbit { to { transform: rotate(360deg); } }
        @keyframes sl-rise {
          from { opacity: 0; transform: translateY(18px) scale(.94); filter: blur(6px); }
          to   { opacity: 1; transform: none; filter: none; }
        }
        .sl-sheen {
          position: absolute; inset: 0; border-radius: 999px; overflow: hidden;
          background: linear-gradient(115deg, transparent 35%, oklch(1 0 0 / 0.16) 50%, transparent 65%);
          background-size: 260% 100%;
          animation: sl-sheen 3.4s ease-in-out infinite;
        }
        @keyframes sl-sheen { 0% { background-position: 180% 0; } 100% { background-position: -80% 0; } }

        .sl-eqbar {
          display: inline-block; width: 2px; height: 28px;
          background: oklch(0.65 0.24 25);
          transform-origin: center;
          animation-name: sl-eq; animation-timing-function: cubic-bezier(.36,.07,.19,.97);
          animation-iteration-count: infinite;
        }
        @keyframes sl-eq { 0%,100% { transform: scaleY(.22); } 50% { transform: scaleY(1.7); } }

        .sl-skip { animation: sl-tag-in .8s cubic-bezier(.16,1,.3,1) 1.4s both; }

        .sl-act { animation: sl-act-in .55s cubic-bezier(.16,1,.3,1) both; }
        @keyframes sl-act-in {
          from { opacity: 0; transform: translateY(8px); filter: blur(4px); }
          to   { opacity: 1; transform: none; filter: none; }
        }

        .sl-shine {
          position: absolute; inset: 0; border-radius: 999px;
          background: linear-gradient(90deg, transparent, oklch(1 0 0 / 0.35), transparent);
          width: 40%;
          animation: sl-shine 1.9s ease-in-out infinite;
        }
        @keyframes sl-shine { 0% { transform: translateX(-120%); } 100% { transform: translateX(320%); } }

        .sl-tag { animation: sl-tag-in .7s cubic-bezier(.16,1,.3,1) both; }
        @keyframes sl-tag-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

        .sl-scan {
          position: absolute; left: 0; right: 0; top: -25%; height: 45%;
          background: linear-gradient(180deg, transparent, oklch(0.65 0.24 25 / 0.10), transparent);
          animation: sl-scan 4s ease-in-out infinite;
        }
        @keyframes sl-scan { 0% { transform: translateY(0); } 100% { transform: translateY(300%); } }

        .sl-grain {
          background-image: radial-gradient(oklch(1 0 0 / 0.6) 0.5px, transparent 0.5px);
          background-size: 3px 3px;
          animation: sl-grain 0.6s steps(3) infinite;
        }
        @keyframes sl-grain {
          0% { background-position: 0 0; }
          33% { background-position: 1px 2px; }
          66% { background-position: 2px 1px; }
          100% { background-position: 0 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sl-wash, .sl-sheen, .sl-eqbar, .sl-scan, .sl-status, .sl-orbit, .sl-grain,
          .sl-shine, .sl-lockup, .sl-act, .sl-tag, .sl-skip {
            animation: none !important;
          }
        }

      `}</style>
    </div>
  );
}
