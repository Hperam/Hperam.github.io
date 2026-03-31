import { portfolio } from "@/data/portfolio";

const orbitNodes = [
  { label: "Signal Routing", left: "10%", top: "16%" },
  { label: "Ranking", left: "76%", top: "14%" },
  { label: "Narrative", left: "84%", top: "44%" },
  { label: "Reliability", left: "66%", top: "78%" },
  { label: "Inference", left: "17%", top: "74%" },
  { label: "Product Taste", left: "4%", top: "48%" }
];

const streamLabels = [
  "Context ingestion",
  "Decision framing",
  "UI narrative",
  "Signal quality",
  "Runtime polish"
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
          className="absolute left-1/2 top-[49%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--brand) / 0.22) 0%, rgb(var(--accent) / 0.08) 40%, transparent 68%)",
            filter: "blur(18px)",
            animation: "glow-pulse 8s ease-in-out infinite alternate"
          }}
        />

        {/* Orbit rings (CSS rotation) */}
        <div
          className="orbit-ring absolute left-1/2 top-[49%] h-[430px] w-[430px] rounded-full border border-white/10"
          style={{ transformOrigin: "center" }}
        />
        <div
          className="orbit-ring-reverse absolute left-1/2 top-[49%] h-[300px] w-[300px] rounded-full border"
          style={{ borderColor: "rgb(var(--brand) / 0.22)", transformOrigin: "center" }}
        />

        {/* Orbit node labels (CSS float) */}
        {orbitNodes.map((node, index) => (
          <div
            key={node.label}
            className={`absolute float-node float-node-${index + 1}`}
            style={{ left: node.left, top: node.top }}
          >
            <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-ink shadow-panel backdrop-blur-xl">
              {node.label}
            </div>
          </div>
        ))}

        {/* Central card (CSS float) */}
        <div
          className="hero-card-float absolute left-1/2 top-[49%] w-[min(90%,340px)] rounded-[32px] border border-white/10 bg-black/35 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
                Interactive system map
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.06em] text-ink">
                AI-native engineering
              </h3>
            </div>
            <div className="hero-core-badge">LIVE</div>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-7 text-ink/74">
            Not a headshot card. A motion system that signals backend depth, product
            taste, and modern AI fluency at first glance.
          </p>

          {/* Stream rows with CSS sweep */}
          <div className="mt-6 space-y-3">
            {streamLabels.map((label, row) => (
              <div
                key={label}
                className="relative h-11 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <div
                  className={`stream-sweep absolute inset-y-0 left-[-28%] w-[52%] rounded-full blur-xl stream-sweep-${row + 1}`}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
                    Layer 0{row + 1}
                  </span>
                  <span className="text-sm text-ink/75">{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {portfolio.stats.slice(0, 3).map((stat, index) => (
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
