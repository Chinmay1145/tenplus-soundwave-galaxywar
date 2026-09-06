import { cn } from "@/lib/utils";

/**
 * PULSE brand mark — a circular waveform sigil.
 * A dual-ring orbit wraps a live equalizer of five bars whose heights ride a
 * sine curve. Renders crisp at any size, respects theme via the accent token,
 * and animates when `animated` is true.
 */
export function LogoMark({
  className,
  animated = false,
  size = 32,
}: {
  className?: string;
  animated?: boolean;
  size?: number;
}) {
  const bars = [
    { x: 14, base: 10, delay: "0s" },
    { x: 20, base: 16, delay: "0.12s" },
    { x: 26, base: 22, delay: "0.24s" },
    { x: 32, base: 14, delay: "0.36s" },
    { x: 38, base: 8, delay: "0.48s" },
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="pulseRingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.86 0.16 25)" />
          <stop offset="60%" stopColor="oklch(0.62 0.24 25)" />
          <stop offset="100%" stopColor="oklch(0.42 0.20 25)" />
        </linearGradient>
        <linearGradient id="pulseBarGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.55 0.24 25)" />
          <stop offset="100%" stopColor="oklch(0.88 0.16 25)" />
        </linearGradient>
        <filter id="pulseGlowF" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="pulseCoreGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="oklch(0.65 0.24 25 / 0.55)" />
          <stop offset="100%" stopColor="oklch(0.65 0.24 25 / 0)" />
        </radialGradient>
      </defs>

      <g>
      {/* outer ring with break at 4 o'clock */}
      <circle
        cx="26"
        cy="26"
        r="22"
        fill="none"
        stroke="url(#pulseRingGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="118 20"
        strokeDashoffset="30"
      />
      {/* inner ring */}
      <circle
        cx="26"
        cy="26"
        r="17"
        fill="none"
        stroke="url(#pulseRingGrad)"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* equalizer bars */}
      <g fill="url(#pulseBarGrad)">
        {bars.map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={26 - b.base / 2}
            width="3"
            height={b.base}
            rx="1.5"
            style={{ transformOrigin: `${b.x + 1.5}px 26px` }}
          >
            {animated && (
              <animate
                attributeName="height"
                values={`${b.base};${b.base * 1.9};${b.base * 0.55};${b.base}`}
                dur="1.4s"
                begin={b.delay}
                repeatCount="indefinite"
              />
            )}
            {animated && (
              <animate
                attributeName="y"
                values={`${26 - b.base / 2};${26 - (b.base * 1.9) / 2};${26 - (b.base * 0.55) / 2};${26 - b.base / 2}`}
                dur="1.4s"
                begin={b.delay}
                repeatCount="indefinite"
              />
            )}
          </rect>
        ))}
      </g>

      </g>

      {/* live pulse dot at the ring break */}
      <circle cx="45" cy="30" r="2" fill="oklch(0.86 0.16 25)">
        {animated && (
          <animate attributeName="r" values="1.4;2.8;1.4" dur="1.2s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  );
}

export function Logo({
  className,
  size = 32,
  wordmark = true,
  animated = false,
}: {
  className?: string;
  size?: number;
  wordmark?: boolean;
  animated?: boolean;
}) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-2", className)}>
      <LogoMark
        size={size}
        animated={animated}
        className="transition-transform duration-500 ease-out group-hover/logo:rotate-6 group-hover/logo:scale-105"
      />
      {wordmark && (
        <span
          className="font-display text-lg font-bold tracking-[0.06em]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, var(--color-foreground) 30%, var(--color-accent) 55%, var(--color-foreground) 80%)",
            backgroundSize: "220% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "logo-sheen 5s ease-in-out infinite",
          }}
        >
          PULSE<span style={{ color: "var(--color-accent)", WebkitTextFillColor: "var(--color-accent)" }}>.</span>
        </span>
      )}
      <style>{`
        @keyframes logo-sheen {
          0%, 100% { background-position: 110% 0; }
          50% { background-position: -10% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .group\\/logo span { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
