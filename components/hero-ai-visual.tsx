const impactLines = [
  { prefix: "$", cmd: "impact --amazon", delay: 0 },
  { prefix: " ", cmd: "Built end-to-end fulfillment simulations", delay: 1, muted: true },
  { prefix: " ", cmd: "forecasting demand across 16-week horizons", delay: 2, muted: true },
  { prefix: "", cmd: "", delay: 2.5 },
  { prefix: "$", cmd: "metrics --production", delay: 3 },
  { prefix: " ", cmd: "Legacy deprecation       → $2M annual savings", delay: 4, highlight: true },
  { prefix: " ", cmd: "Post-launch fallback     → <0.1%", delay: 5, highlight: true },
  { prefix: " ", cmd: "Planning horizon         → 16 weeks", delay: 6, highlight: true },
  { prefix: "", cmd: "", delay: 6.5 },
  { prefix: "$", cmd: "stack --core", delay: 7 },
  { prefix: " ", cmd: "Java · Spark · AWS · Python · Docker · Terraform", delay: 8, accent: true },
];

export function HeroAiVisual() {
  return (
    <div className="hero-enter hero-stagger-7">
      {/* Terminal window */}
      <div className="surface-card terminal-card relative overflow-hidden rounded-[20px]">

        {/* Animated border glow */}
        <div className="terminal-glow-border absolute -inset-px rounded-[20px] -z-10" />

        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-brand/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/30" />
          <span className="ml-3 flex-1 text-center text-[11px] tracking-wide text-muted/50">
            career-highlights — zsh
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-[13px] leading-7">
          {impactLines.map((line, i) => (
            <div
              key={i}
              className={`terminal-line ${line.cmd === "" ? "h-2" : ""}`}
              style={{ animationDelay: `${line.delay * 0.35}s` }}
            >
              {line.cmd && (
                <>
                  <span className={line.prefix === "$" ? "text-brand" : "text-muted/25"}>
                    {line.prefix}{line.prefix === "$" ? " " : "  "}
                  </span>
                  <span className={
                    line.highlight
                      ? "text-brand"
                      : line.accent
                        ? "text-accent"
                        : line.muted
                          ? "text-muted"
                          : "text-ink/90"
                  }>
                    {line.cmd}
                  </span>
                </>
              )}
            </div>
          ))}
          <div className="terminal-line mt-1" style={{ animationDelay: "3.2s" }}>
            <span className="text-brand">$ </span>
            <span className="terminal-cursor inline-block h-4 w-[2px] bg-brand align-middle" />
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" style={{ animation: "glow-pulse 2s ease-in-out infinite alternate" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span className="text-muted/60">Amazon · Seattle</span>
          </div>
          <span className="text-muted/40">SDE · 2022 — present</span>
        </div>
      </div>
    </div>
  );
}
