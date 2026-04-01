"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [phase, setPhase] = useState<"wipe" | "exit" | "hidden">("wipe");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 900);
    const t2 = setTimeout(() => setPhase("hidden"), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Gradient wipe bar — sweeps left to right */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "exit" ? "translate-x-full" : "translate-x-0"
        }`}
        style={{ background: "rgb(var(--surface))" }}
      >
        {/* Gradient leading edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[200px]"
          style={{
            background: "linear-gradient(90deg, rgb(var(--surface)), rgb(var(--brand) / 0.3), rgb(var(--accent) / 0.2), transparent)"
          }}
        />

        {/* Thin accent line at leading edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(180deg, rgb(var(--brand)), rgb(var(--accent)), rgb(var(--brand)))"
          }}
        />
      </div>
    </div>
  );
}
