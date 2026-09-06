import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/** Cinematic acts — each act owns a headline, a subline and a progress ceiling. */
const ACTS = [
  { title: "Booting audio core", sub: "Initialising DSP · 24-bit pipeline", to: 26 },
  { title: "Fetching catalogue", sub: "150 hand-tuned products", to: 52 },
  { title: "Tuning drivers", sub: "Adaptive ANC · spatial engine", to: 78 },
  { title: "Finalising soundstage", sub: "Reference calibration complete", to: 97 },
  { title: "Sound ready", sub: "Welcome to the listening room", to: 100 },
] as const;

const TAGS = ["24-bit · 96 kHz", "Hi-Res Certified", "Adaptive ANC", "Spatial Audio"];

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
      {/* cinematic colour field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sl-wash"
        style={{
          background:
            "linear-gradient(115deg, transparent 0 46%, oklch(0.65 0.24 25 / 0.08) 46% 47%, transparent 47%), radial-gradient(900px 500px at 50% 42%, oklch(0.65 0.24 25 / 0.16), transparent 72%)",
        }}
      />
      {/* fine grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.65 0.24 25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.24 25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(closest-side at 50% 50%, black, transparent 82%)",
        }}
      />
      {/* sweeping scanline */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="sl-scan" />
      </div>
      {/* letterbox bars — the cinematic frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[5vh] bg-background sl-bar-top sm:h-[7vh]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[5vh] bg-background sl-bar-bottom sm:h-[7vh]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-4 top-[10vh] flex items-center justify-between gap-3 border-b border-border/60 pb-3 sm:inset-x-12">
        <span className="mono truncate text-[10px] tracking-[0.2em] text-muted-foreground">PULSE AUDIO LABS / STARTUP</span>
        <span className="mono shrink-0 text-[10px] tracking-[0.2em] text-accent/80 tabular-nums">T+{clock}</span>
      </div>

      {/* low backdrop spectrum — fills the widescreen edges */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[7vh] flex h-24 items-end justify-center gap-[3px] opacity-25 sm:h-32">
        {Array.from({ length: 64 }).map((_, i) => (
          <span
            key={i}
            className="sl-spectrum"
            style={{
              animationDelay: `${(i % 16) * 0.11}s`,
              animationDuration: `${1.1 + ((i * 7) % 5) * 0.22}s`,
              height: `${18 + ((i * 13) % 60)}%`,
            }}
          />
        ))}
      </div>

      <div className="relative flex w-full max-w-lg flex-col items-center px-5 sm:px-6">
        {/* logo lockup */}
        <div className="sl-lockup relative flex flex-col items-center">
          {/* expanding sonar rings behind the lockup */}
          <span aria-hidden className="sl-ring" />
          <span aria-hidden className="sl-ring" style={{ animationDelay: "1.2s" }} />
          <span aria-hidden className="sl-ring" style={{ animationDelay: "2.4s" }} />
          <div className="relative grid h-28 w-28 place-items-center border border-border bg-surface/60 backdrop-blur-md sm:h-36 sm:w-36">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1 bg-border/60"
              style={{
                background: `linear-gradient(90deg, var(--color-accent) ${pct}%, transparent ${pct}%)`,
              }}
            />
            <span aria-hidden className="absolute left-2 top-2 h-3 w-3 border-l border-t border-accent" />
            <span aria-hidden className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent" />
            <LogoMark size={60} animated className="sm:h-[72px] sm:w-[72px]" />
          </div>
          <div className="mt-5 font-display text-3xl font-bold tracking-[0.2em] sm:mt-6 sm:text-4xl">
            PULSE<span className="text-accent">.</span>
          </div>
          <div className="mono mt-2 text-[10px] tracking-[0.4em] text-accent/70">AUDIO LABS</div>
        </div>

        {/* equaliser */}
        <div className="mt-5 flex h-7 items-center gap-1 sm:mt-7 sm:h-8" aria-hidden>
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className="sl-eqbar"
              style={{ animationDelay: `${i * 0.09}s`, animationDuration: `${0.9 + (i % 4) * 0.14}s` }}
            />
          ))}
        </div>

        {/* act headline with crossfade */}
        <div className="mt-6 h-12 text-center sm:mt-8">
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
        <div className="mt-3 w-full">
          <div className="relative h-[2px] w-full overflow-hidden bg-border/70">
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
          <div className="mono mt-2.5 flex items-center justify-between text-[10px] tracking-[0.24em] text-muted-foreground">
            <span>
              ACT {actIdx + 1} / {ACTS.length}
            </span>
            <span className="text-accent">{pct}%</span>
          </div>
        </div>

        {/* act ticks */}
        <ul className="mt-5 grid w-full grid-cols-4 gap-1.5" aria-hidden>
          {ACTS.map((a, i) => {
            const done = pct >= a.to;
            const live = i === actIdx && !done;
            return (
              <li key={a.title} className="flex flex-col items-center gap-1.5">
                <span
                  className={`h-[3px] w-full rounded-full transition-all duration-500 ${
                    done
                      ? "bg-accent shadow-[0_0_10px_oklch(0.65_0.24_25/0.8)]"
                      : live
                        ? "bg-accent/60"
                        : "bg-border/70"
                  }`}
                />
                <span
                  className={`mono truncate text-[10px] tracking-[0.12em] transition-colors ${
                    done ? "text-accent" : live ? "text-foreground/70" : "text-muted-foreground/45"
                  }`}
                >
                  {a.title.split(" ")[0].toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid w-full grid-cols-2 border border-border/60 sm:mt-7 sm:grid-cols-4">
          {TAGS.map((t, i) => (
            <span
              key={t}
              className="mono sl-tag border-r border-border/60 px-2 py-2 text-center text-[10px] tracking-[0.12em] text-muted-foreground last:border-r-0 sm:px-2.5"
              style={{ animationDelay: `${0.5 + i * 0.12}s` }}
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .sl-wash { animation: sl-breathe 6s ease-in-out infinite; }
        @keyframes sl-breathe { 0%,100% { opacity: .75; } 50% { opacity: 1; } }

        .sl-bar-top    { animation: sl-open-top 1.1s cubic-bezier(.16,1,.3,1) both; }
        .sl-bar-bottom { animation: sl-open-bottom 1.1s cubic-bezier(.16,1,.3,1) both; }
        @keyframes sl-open-top    { from { height: 52vh; } to { height: 7vh; } }
        @keyframes sl-open-bottom { from { height: 52vh; } to { height: 7vh; } }

        .sl-lockup { animation: sl-rise 1.1s cubic-bezier(.16,1,.3,1) .25s both; }
        .sl-ring {
          position: absolute; top: 0; left: 50%;
          width: 9rem; height: 9rem; margin-left: -4.5rem;
          border: 1px solid oklch(0.65 0.24 25 / 0.35);
          animation: sl-ripple 3.6s cubic-bezier(.16,1,.3,1) infinite;
          pointer-events: none;
        }
        @media (min-width: 640px) { .sl-ring { width: 11.5rem; height: 11.5rem; margin-left: -5.75rem; } }
        @keyframes sl-ripple {
          0%   { transform: scale(1); opacity: 0; }
          15%  { opacity: .8; }
          100% { transform: scale(1.9); opacity: 0; }
        }
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
          display: inline-block; width: 3px; height: 22px;
          background: oklch(0.65 0.24 25);
          transform-origin: center;
          animation-name: sl-eq; animation-timing-function: cubic-bezier(.36,.07,.19,.97);
          animation-iteration-count: infinite;
        }
        @keyframes sl-eq { 0%,100% { transform: scaleY(.22); } 50% { transform: scaleY(1.7); } }

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

        @media (prefers-reduced-motion: reduce) {
          .sl-wash, .sl-sheen, .sl-eqbar, .sl-scan, .sl-ring,
          .sl-shine, .sl-bar-top, .sl-bar-bottom, .sl-lockup, .sl-act, .sl-tag {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
