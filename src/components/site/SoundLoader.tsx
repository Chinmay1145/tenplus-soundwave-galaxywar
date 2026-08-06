import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/** Cinematic acts — each act owns a headline, a subline and a progress ceiling. */
const ACTS = [
  { title: "Booting audio core", sub: "Initialising DSP · 24-bit pipeline", to: 26 },
  { title: "Fetching catalogue", sub: "150 hand-tuned products", to: 52 },
  { title: "Tuning drivers", sub: "Adaptive ANC · spatial engine", to: 78 },
  { title: "Finalising soundstage", sub: "Reference calibration complete", to: 97 },
] as const;

const TAGS = ["24-bit · 96 kHz", "Hi-Res Certified", "Adaptive ANC", "Spatial Audio"];

export function SoundLoader({ label }: { label?: string }) {
  const [pct, setPct] = useState(3);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 97 ? 97 : p + Math.max(1, Math.round((100 - p) / 11))));
    }, 130);
    return () => clearInterval(id);
  }, []);

  const actIdx = Math.min(ACTS.length - 1, ACTS.findIndex((a) => pct <= a.to) === -1 ? ACTS.length - 1 : ACTS.findIndex((a) => pct <= a.to));
  const act = ACTS[actIdx];
  const headline = label ?? act.title;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* ambient cinematic wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 sl-wash"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 42%, oklch(0.65 0.24 25 / 0.22), transparent 72%), radial-gradient(600px 400px at 12% 100%, oklch(0.65 0.24 25 / 0.12), transparent 70%)",
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
      {/* drifting motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="sl-particle"
            style={{
              left: `${(i * 61) % 100}%`,
              top: `${55 + ((i * 29) % 45)}%`,
              animationDelay: `${(i % 9) * 0.45}s`,
              animationDuration: `${5 + (i % 6)}s`,
            }}
          />
        ))}
      </div>
      {/* letterbox bars — the cinematic frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[7vh] bg-background sl-bar-top" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[7vh] bg-background sl-bar-bottom" />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 60px oklch(0.14 0 0 / 0.75)" }}
      />

      <div className="relative flex w-full max-w-md flex-col items-center px-6">
        {/* glowing logo lockup */}
        <div className="sl-lockup relative flex flex-col items-center">
          <div aria-hidden className="sl-halo" />
          {/* circular progress ring wrapping the mark */}
          <div className="relative grid place-items-center">
            <div
              aria-hidden
              className="absolute h-[148px] w-[148px] rounded-full"
              style={{
                background: `conic-gradient(oklch(0.72 0.24 25) ${pct * 3.6}deg, oklch(0.65 0.24 25 / 0.12) 0deg)`,
                mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
                transition: "background 400ms linear",
              }}
            />
            <div className="relative grid place-items-center rounded-full border border-accent/25 bg-background/60 p-7 backdrop-blur-md">
              <span aria-hidden className="sl-sheen" />
              <LogoMark size={64} animated />
            </div>
          </div>
          <div className="mt-6 font-display text-4xl font-bold tracking-[0.22em] sl-word">
            PULSE<span className="text-accent">.</span>
          </div>
          <div className="mono mt-2 text-[10px] tracking-[0.42em] text-accent/70">AUDIO LABS</div>
        </div>

        {/* equaliser */}
        <div className="mt-8 flex items-end gap-1.5" aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <span
              key={i}
              className="sl-eqbar"
              style={{ animationDelay: `${i * 0.09}s`, animationDuration: `${0.9 + (i % 4) * 0.14}s` }}
            />
          ))}
        </div>

        {/* act headline with crossfade */}
        <div className="mt-8 h-12 text-center">
          <div key={headline} className="sl-act">
            <div className="mono text-[11px] tracking-[0.4em] text-foreground/85">
              {headline.toUpperCase()}
            </div>
            <div className="mono mt-1.5 text-[9px] tracking-[0.22em] text-muted-foreground">
              {(label ? "PREPARING YOUR SESSION" : act.sub).toUpperCase()}
            </div>
          </div>
        </div>

        {/* progress */}
        <div className="mt-2 w-full">
          <div className="relative h-[5px] w-full overflow-hidden rounded-full bg-border/50">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent/50 via-accent to-accent/60 transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%`, boxShadow: "0 0 16px oklch(0.65 0.24 25 / 0.85)" }}
            />
            <span aria-hidden className="sl-shine" />
          </div>
          <div className="mono mt-2.5 flex items-center justify-between text-[9px] tracking-[0.26em] text-muted-foreground">
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
                  className={`mono truncate text-[8px] tracking-[0.14em] transition-colors ${
                    done ? "text-accent" : live ? "text-foreground/70" : "text-muted-foreground/45"
                  }`}
                >
                  {a.title.split(" ")[0].toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex flex-wrap justify-center gap-1.5">
          {TAGS.map((t, i) => (
            <span
              key={t}
              className="mono sl-tag rounded-full border border-accent/25 bg-accent/[0.06] px-2.5 py-1 text-[9px] tracking-[0.22em] text-accent/80"
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
        @keyframes sl-rise {
          from { opacity: 0; transform: translateY(18px) scale(.94); filter: blur(6px); }
          to   { opacity: 1; transform: none; filter: none; }
        }
        .sl-halo {
          position: absolute; left: 50%; top: 46px; width: 300px; height: 300px;
          margin-left: -150px; margin-top: -150px; border-radius: 999px; pointer-events: none;
          background: radial-gradient(circle, oklch(0.65 0.24 25 / 0.35), transparent 66%);
          filter: blur(14px);
          animation: sl-halo 3.2s ease-in-out infinite;
        }
        @keyframes sl-halo {
          0%,100% { transform: scale(.92); opacity: .7; }
          50%     { transform: scale(1.08); opacity: 1; }
        }
        .sl-sheen {
          position: absolute; inset: 0; border-radius: 999px; overflow: hidden;
          background: linear-gradient(115deg, transparent 35%, oklch(1 0 0 / 0.16) 50%, transparent 65%);
          background-size: 260% 100%;
          animation: sl-sheen 3.4s ease-in-out infinite;
        }
        @keyframes sl-sheen { 0% { background-position: 180% 0; } 100% { background-position: -80% 0; } }

        .sl-word {
          background: linear-gradient(100deg, oklch(0.9 0 0), oklch(0.78 0.2 25), oklch(0.9 0 0));
          background-size: 220% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          text-shadow: 0 0 34px oklch(0.65 0.24 25 / 0.35);
          animation: sl-shimmer 3.6s linear infinite;
        }
        @keyframes sl-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .sl-eqbar {
          display: inline-block; width: 4px; height: 26px; border-radius: 999px;
          background: linear-gradient(180deg, oklch(0.82 0.2 25), oklch(0.55 0.24 25 / 0.35));
          box-shadow: 0 0 10px oklch(0.65 0.24 25 / 0.6);
          transform-origin: bottom;
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

        .sl-particle {
          position: absolute; width: 3px; height: 3px; border-radius: 999px;
          background: oklch(0.65 0.24 25 / 0.75);
          box-shadow: 0 0 8px oklch(0.65 0.24 25 / 0.8);
          animation-name: sl-float; animation-timing-function: linear; animation-iteration-count: infinite;
        }
        @keyframes sl-float {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateY(-220px) scale(.35); opacity: 0; }
        }

        .sl-scan {
          position: absolute; left: 0; right: 0; top: -25%; height: 45%;
          background: linear-gradient(180deg, transparent, oklch(0.65 0.24 25 / 0.10), transparent);
          animation: sl-scan 4s ease-in-out infinite;
        }
        @keyframes sl-scan { 0% { transform: translateY(0); } 100% { transform: translateY(300%); } }

        @media (prefers-reduced-motion: reduce) {
          .sl-wash, .sl-halo, .sl-sheen, .sl-word, .sl-eqbar, .sl-particle, .sl-scan,
          .sl-shine, .sl-bar-top, .sl-bar-bottom, .sl-lockup, .sl-act, .sl-tag {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
