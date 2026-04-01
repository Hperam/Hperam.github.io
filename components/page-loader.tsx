"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "hidden">("loading");

  useEffect(() => {
    // Animate progress 0 → 100
    const start = performance.now();
    const duration = 800;

    function tick() {
      const elapsed = performance.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("exit"), 150);
        setTimeout(() => setPhase("hidden"), 800);
      }
    }
    requestAnimationFrame(tick);
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "exit"
          ? "opacity-0 scale-[1.02]"
          : "opacity-100 scale-100"
      }`}
      style={{ background: "rgb(var(--surface))" }}
    >
      {/* Counter */}
      <span
        className="font-mono text-5xl font-light tabular-nums tracking-tight text-ink/80"
      >
        {progress}
      </span>

      {/* Progress bar */}
      <div className="h-[1px] w-48 overflow-hidden bg-white/[0.06] rounded-full">
        <div
          className="h-full rounded-full transition-[width] duration-75 ease-linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, rgb(var(--brand)), rgb(var(--accent)))"
          }}
        />
      </div>
    </div>
  );
}
