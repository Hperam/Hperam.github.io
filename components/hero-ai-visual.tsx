const statusLines = [
  { prefix: "~", cmd: "whoami", delay: 0 },
  { prefix: ">", cmd: "Harshith Sai Peram — Software Engineer", delay: 1, muted: true },
  { prefix: "~", cmd: "stack --current", delay: 2 },
  { prefix: ">", cmd: "Java · AWS · React · Python · Docker · Terraform", delay: 3, muted: true },
  { prefix: "~", cmd: "status", delay: 4 },
  { prefix: ">", cmd: "building at Amazon  ●  Seattle, WA", delay: 5, muted: true, green: true },
];

const metrics = [
  { label: "uptime", value: "5+ yrs" },
  { label: "savings", value: "$2M" },
  { label: "fallback", value: "<0.1%" },
];

export function HeroAiVisual() {
  return (
    <div className="hero-enter hero-stagger-7">
      {/* Terminal window */}
      <div className="terminal-card relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[rgb(13,17,28)] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">

        {/* Animated border glow */}
        <div className="terminal-glow-border absolute -inset-px rounded-[20px] -z-10" />

        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 text-center text-[11px] tracking-wide text-white/30">
            harshith@portfolio ~ zsh
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-[13px] leading-7">
          {statusLines.map((line, i) => (
            <div
              key={i}
              className="terminal-line"
              style={{ animationDelay: `${line.delay * 0.4}s` }}
            >
              <span className={line.prefix === "~" ? "text-brand" : "text-white/20"}>
                {line.prefix}{" "}
              </span>
              <span className={
                line.green
                  ? "text-emerald-400"
                  : line.muted
                    ? "text-white/50"
                    : "text-white/90"
              }>
                {line.cmd}
              </span>
              {line.green && (
                <span className="terminal-cursor ml-1 inline-block h-4 w-[2px] bg-brand align-middle" />
              )}
            </div>
          ))}

          {/* Metrics bar */}
          <div className="mt-4 flex gap-4 border-t border-white/[0.06] pt-4">
            {metrics.map((m) => (
              <div key={m.label} className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-white/25">{m.label}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white/90">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
