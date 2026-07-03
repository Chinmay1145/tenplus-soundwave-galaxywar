import { useEffect, useState } from "react";
import { SoundLoader } from "./SoundLoader";

/**
 * First-load splash. Shows the SoundLoader over a full-bleed intro for a
 * short window on the very first paint of a session, then fades out. Runs
 * once per browser session (sessionStorage) so navigations feel instant.
 */
export function BootSplash({ minDurationMs = 1400 }: { minDurationMs?: number }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("pulse-boot-shown") !== "1";
    } catch {
      return true;
    }
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDurationMs - elapsed);
      window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem("pulse-boot-shown", "1");
          } catch {
            /* ignore */
          }
        }, 500);
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
      };
    }
  }, [visible, minDurationMs]);

  if (!visible) return null;
  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={fading}
    >
      <SoundLoader label="Warming up your sound" />
    </div>
  );
}
