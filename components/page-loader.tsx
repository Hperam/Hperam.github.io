"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "done" | "hidden">("loading");

  useEffect(() => {
    // Short delay then fade out
    const timer = setTimeout(() => setPhase("done"), 800);
    const hide = setTimeout(() => setPhase("hidden"), 1400);
    return () => {
      clearTimeout(timer);
      clearTimeout(hide);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`page-loader fixed inset-0 z-[9999] flex items-center justify-center bg-surface transition-opacity duration-500 ${
        phase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated initials */}
        <div className="loader-ring relative grid h-16 w-16 place-items-center">
          <span className="font-display text-xl font-bold tracking-[-0.05em] text-ink">
            HP
          </span>
        </div>
        {/* Loading bar */}
        <div className="h-[2px] w-24 overflow-hidden rounded-full bg-white/10">
          <div className="loader-bar h-full rounded-full bg-gradient-to-r from-brand to-accent" />
        </div>
      </div>
    </div>
  );
}
