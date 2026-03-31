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
      <div className="terminal-card relative overflow-hidden rounded-[20px] border border-[#2a2e3a] bg-[#0d1117] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">

        {/* Animated border glow */}
        <div className="terminal-glow-border absolute -inset-px rounded-[20px] -z-10" />

        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-[#21262d] bg-[#161b22] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 text-center font-mono text-[11px] text-[#484f58]">
            ~/career-highlights — zsh
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
                  <span className={line.prefix === "$" ? "text-[#7ee787]" : "text-[#3b4048]"}>
                    {line.prefix}{line.prefix === "$" ? " " : "  "}
                  </span>
                  <span className={
                    line.highlight
                      ? "text-[#ffa657]"
                      : line.accent
                        ? "text-[#79c0ff]"
                        : line.muted
                          ? "text-[#8b949e]"
                          : "text-[#e6edf3]"
                  }>
                    {line.cmd}
                  </span>
                </>
              )}
            </div>
          ))}
          <div className="terminal-line mt-1" style={{ animationDelay: "3.2s" }}>
            <span className="text-[#7ee787]">$ </span>
            <span className="terminal-cursor inline-block h-4 w-[2px] bg-[#7ee787] align-middle" />
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between border-t border-[#21262d] bg-[#161b22] px-5 py-2.5 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#7ee787] opacity-75" style={{ animation: "glow-pulse 2s ease-in-out infinite alternate" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ee787]" />
            </span>
            <span className="text-[#8b949e]">Amazon · Seattle</span>
          </div>
          <span className="text-[#484f58]">SDE · 2022 — present</span>
        </div>
      </div>
    </div>
  );
}
