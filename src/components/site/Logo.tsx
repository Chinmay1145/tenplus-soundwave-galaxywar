import { cn } from "@/lib/utils";

/**
 * PULSE brand mark — a hexagonal soundwave sigil.
 * A layered hex frame wraps a stylized "P" formed from soundwave arcs, with
 * a live pulse dot. Renders crisp at any size and respects theme via the
 * --color-accent token.
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
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="pulseHexGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.18 25)" />
          <stop offset="55%" stopColor="oklch(0.65 0.24 25)" />
          <stop offset="100%" stopColor="oklch(0.48 0.22 25)" />
        </linearGradient>
        <linearGradient id="pulseWaveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.85 0.16 25)" />
          <stop offset="100%" stopColor="oklch(0.55 0.24 25)" />
        </linearGradient>
        <radialGradient id="pulseHexGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="oklch(0.65 0.24 25 / 0.55)" />
          <stop offset="100%" stopColor="oklch(0.65 0.24 25 / 0)" />
        </radialGradient>
        <filter id="pulseHexBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="24" cy="24" r="22" fill="url(#pulseHexGlow)" />

      {/* outer hex frame */}
      <path
        d="M24 3 L41 12.5 L41 35.5 L24 45 L7 35.5 L7 12.5 Z"
        fill="none"
        stroke="url(#pulseHexGrad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* inner hex accent */}
      <path
        d="M24 9 L36 15.5 L36 32.5 L24 39 L12 32.5 L12 15.5 Z"
        fill="none"
        stroke="url(#pulseHexGrad)"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* concentric sound arcs (radiating right) */}
      <g stroke="url(#pulseWaveGrad)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M18 24 a6 6 0 0 1 6 -6" opacity="0.95">
          {animated && (
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M18 24 a10 10 0 0 1 10 -10" opacity="0.7">
          {animated && (
            <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.6s" begin="0.25s" repeatCount="indefinite" />
          )}
        </path>
        <path d="M18 24 a14 14 0 0 1 14 -14" opacity="0.45">
          {animated && (
            <animate attributeName="opacity" values="0.1;0.7;0.1" dur="1.6s" begin="0.5s" repeatCount="indefinite" />
          )}
        </path>
      </g>

      {/* vertical stem of the "P" */}
      <rect x="16" y="14" width="3" height="20" rx="1.5" fill="url(#pulseWaveGrad)" filter="url(#pulseHexBlur)" opacity="0.85" />
      <rect x="16" y="14" width="3" height="20" rx="1.5" fill="url(#pulseWaveGrad)" />

      {/* live pulse dot */}
      <circle cx="17.5" cy="24" r="2.2" fill="oklch(0.85 0.16 25)">
        {animated && (
          <animate attributeName="r" values="1.6;3.2;1.6" dur="1.2s" repeatCount="indefinite" />
        )}
        {animated && (
          <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
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
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark size={size} animated={animated} />
      {wordmark && (
        <span className="font-display text-lg font-bold tracking-[0.02em]">
          PULSE<span className="text-accent">.</span>
        </span>
      )}
    </span>
  );
}
