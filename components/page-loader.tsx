"use client";

import { useEffect, useState } from "react";

export function PageLoader() {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "hidden">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 1200);
    const t3 = setTimeout(() => setPhase("hidden"), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "exit"
          ? "opacity-0 scale-105 blur-md"
          : "opacity-100 scale-100 blur-0"
      }`}
      style={{ background: "rgb(var(--surface))" }}
    >
      {/* Background ambient pulse */}
      <div
        className="absolute h-[400px] w-[400px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgb(var(--brand) / 0.6), rgb(var(--accent) / 0.3), transparent 70%)",
          animation: "loader-ambient 1.5s ease-in-out infinite alternate"
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Main logo mark */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="loader-outer-ring absolute -inset-5 rounded-full" />
          {/* Inner pulsing ring */}
          <div className="absolute -inset-2 rounded-full border border-brand/20" style={{ animation: "loader-inner-pulse 1s ease-in-out infinite alternate" }} />

          {/* Core */}
          <div
            className={`relative grid h-20 w-20 place-items-center rounded-full border border-white/10 transition-all duration-700 ${
              phase === "enter" ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{
              background: "radial-gradient(circle at 35% 35%, rgb(var(--brand) / 0.25), rgb(var(--surface)))",
              boxShadow: "0 0 40px rgb(var(--brand) / 0.2), 0 0 80px rgb(var(--accent) / 0.1)"
            }}
          >
            <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none">
              {/* H */}
              <path
                d="M12 16v32M12 32h14M26 16v32"
                stroke="rgb(var(--ink))"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="loader-letter"
                style={{ strokeDasharray: 96, strokeDashoffset: 96, animation: "loader-draw 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s forwards" }}
              />
              {/* P */}
              <path
                d="M38 48V16h10a8 8 0 010 16H38"
                stroke="url(#hp-gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="loader-letter"
                style={{ strokeDasharray: 80, strokeDashoffset: 80, animation: "loader-draw 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s forwards" }}
              />
              <defs>
                <linearGradient id="hp-gradient" x1="38" y1="16" x2="56" y2="48">
                  <stop stopColor="rgb(var(--brand))" />
                  <stop offset="1" stopColor="rgb(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-500 delay-200 ${
            phase === "enter" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <p className="font-display text-sm font-medium tracking-[-0.02em] text-ink/80">Harshith Sai Peram</p>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted/60">Software Engineer</p>
        </div>

        {/* Progress line */}
        <div
          className={`h-px w-32 overflow-hidden rounded-full transition-all duration-500 delay-300 ${
            phase === "enter" ? "opacity-0 w-0" : "opacity-100 w-32"
          }`}
          style={{ background: "rgb(var(--muted) / 0.1)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, rgb(var(--brand)), rgb(var(--accent)))",
              animation: "loader-progress 1s cubic-bezier(0.22, 1, 0.36, 1) forwards"
            }}
          />
        </div>
      </div>
    </div>
  );
}
