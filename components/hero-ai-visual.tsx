const floatingPanels = [
  {
    title: "Backend systems",
    copy: "High-scale thinking packaged in a clear visual surface.",
    className: "left-2 top-10 w-48 lg:left-0"
  },
  {
    title: "AI systems",
    copy: "Grounded flows, operational context, and faster decision loops.",
    className: "right-2 top-14 w-52 lg:right-0"
  },
  {
    title: "Execution quality",
    copy: "Systems that look sharp, move well, and communicate clearly.",
    className: "bottom-8 left-8 w-56"
  }
];

const dataRows = [
  { label: "Platform", value: "Forecasting + simulations" },
  { label: "AI", value: "Grounded product workflows" },
  { label: "Full-stack", value: "APIs + shipped user flows" }
];

export function HeroAiVisual() {
  return (
    <div className="hero-visual-shell glow-border surface-card relative min-h-[560px] overflow-hidden rounded-[36px] p-4 hero-enter hero-stagger-7 sm:p-6">
      {/* Grid + gradient overlays (static, no JS) */}
      <div className="hero-visual-grid absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 20% 18%, rgb(var(--brand) / 0.24), transparent 28%), radial-gradient(circle at 84% 18%, rgb(var(--accent) / 0.28), transparent 24%), radial-gradient(circle at 50% 80%, rgb(var(--brand) / 0.16), transparent 30%)"
        }}
      />

      {/* Animated shimmer line (CSS-only) */}
      <div className="shimmer-line absolute inset-x-[-20%] top-24 h-px" />

      {/* Inner content */}
      <div className="relative h-full min-h-[528px]">
        {/* Pulsing center glow (CSS-only) */}
        <div
          className="absolute left-1/2 top-[48%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--brand) / 0.22) 0%, rgb(var(--accent) / 0.08) 40%, transparent 68%)",
            filter: "blur(18px)",
            animation: "glow-pulse 8s ease-in-out infinite alternate"
          }}
        />

        {/* Orbit rings (CSS rotation) */}
        <div
          className="orbit-ring absolute left-1/2 top-[48%] h-[408px] w-[408px] rounded-full border border-white/10"
          style={{ transformOrigin: "center" }}
        />
        <div
          className="orbit-ring-reverse absolute left-1/2 top-[48%] h-[276px] w-[276px] rounded-full border"
          style={{ borderColor: "rgb(var(--brand) / 0.22)", transformOrigin: "center" }}
        />

        {/* Floating panels (CSS float) */}
        {floatingPanels.map((panel, index) => (
          <div
            key={panel.title}
            className={`absolute float-node float-node-${index + 1} ${panel.className} rounded-[26px] border border-white/10 bg-black/28 p-4 shadow-panel backdrop-blur-xl`}
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              {panel.title}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/80">{panel.copy}</p>
          </div>
        ))}

        {/* Central card (CSS float) */}
        <div
          className="hero-card-float absolute left-1/2 top-[48%] w-[min(90%,360px)] rounded-[32px] border border-white/10 bg-black/35 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
                Engineering command layer
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.06em] text-ink">
                Modern software systems
              </h3>
            </div>
            <div className="hero-core-badge">LIVE</div>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-7 text-ink/74">
            A cleaner hero graphic built to signal platform depth, AI fluency, and
            end-to-end engineering range without turning the page into a GPU stress test.
          </p>

          {/* Stream rows with CSS sweep */}
          <div className="mt-6 space-y-3">
            {dataRows.map((row, index) => (
              <div
                key={row.label}
                className="relative h-11 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <div
                  className={`stream-sweep absolute inset-y-0 left-[-28%] w-[52%] rounded-full blur-xl stream-sweep-${index + 1}`}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
                    {row.label}
                  </span>
                  <span className="text-sm text-ink/75">{row.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Years", value: "5+" },
              { label: "Savings", value: "$2M" },
              { label: "Fallback", value: "<0.1%" }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`stat-float-${index + 1} rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-4`}
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-muted">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-ink">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
