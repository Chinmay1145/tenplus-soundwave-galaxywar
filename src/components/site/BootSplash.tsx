import { useEffect, useState } from "react";
import { SoundLoader } from "./SoundLoader";

/**
 * First-load splash. Shows the SoundLoader over a full-bleed intro for a
 * short window on the very first paint of a session, then fades out. Runs
 * once per browser session (sessionStorage) so navigations feel instant.
 */
export function BootSplash({ minDurationMs = 2400 }: { minDurationMs?: number }) {
  // Start hidden on both server and first client render to keep hydration
  // identical, then reveal after mount if this session hasn't seen it.
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("pulse-boot-shown") !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);


  useEffect(() => {
    if (!visible) return;
    // Lock background scroll while the splash covers the screen.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDurationMs - elapsed);
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = prevOverflow;
          try {
            sessionStorage.setItem("pulse-boot-shown", "1");
          } catch {
            /* ignore */
          }
        }, 900);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else {
      window.addEventListener("load", finish, { once: true });
      // Safety net — never trap the user behind the splash.
      const safety = window.setTimeout(finish, minDurationMs + 2500);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(safety);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [visible, minDurationMs]);

  if (!visible) return null;
  const skip = () => {
    if (fading) return;
    setFading(true);
    window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("pulse-boot-shown", "1");
      } catch {
        /* ignore */
      }
    }, 700);
  };
  return (
    <div
      className="fixed inset-0 z-[200]"
      aria-hidden={fading}
      style={{
        width: "100vw",
        height: "100dvh",
        minHeight: "100vh",
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(-1.5rem) scale(1.015)" : "none",
        filter: fading ? "blur(4px)" : "none",
        transition:
          "opacity 800ms cubic-bezier(.16,1,.3,1), transform 900ms cubic-bezier(.16,1,.3,1), filter 700ms ease-out",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <SoundLoader label={undefined} onSkip={skip} />
    </div>
  );
}
