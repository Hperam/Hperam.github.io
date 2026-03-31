import { portfolio } from "@/data/portfolio";

const highlights = [
  { label: "Years building", value: "5+", accent: true },
  { label: "Annual savings", value: "$2M", accent: false },
  { label: "Post-launch fallback", value: "<0.1%", accent: false }
];

const capabilities = [
  "Backend platforms",
  "Cloud-native systems",
  "AI product engineering",
  "Full-stack delivery"
];

export function HeroAiVisual() {
  return (
    <div className="hero-enter hero-stagger-7 grid gap-4">
      {/* Top row: 3 stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {highlights.map((item) => (
          <div
            key={item.label}
            className={`surface-card rounded-[24px] p-5 ${
              item.accent
                ? "border-brand/20 bg-gradient-to-br from-brand/15 to-accent/10"
                : ""
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.26em] text-muted">
              {item.label}
            </p>
            <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Middle: main card with gradient mesh */}
      <div className="surface-card glow-border relative overflow-hidden rounded-[28px] p-6">
        <div className="hero-visual-grid absolute inset-0 opacity-50" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgb(var(--brand) / 0.2), transparent 40%), radial-gradient(circle at 80% 80%, rgb(var(--accent) / 0.15), transparent 35%)"
          }}
        />
        <div className="shimmer-line absolute inset-x-[-10%] top-0 h-px" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              What I build
            </p>
            <div className="hero-core-badge">Active</div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {capabilities.map((cap) => (
              <div
                key={cap}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink/85 backdrop-blur"
              >
                {cap}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: company badges + tech ticker */}
      <div className="grid grid-cols-2 gap-4">
        <div className="surface-card flex items-center gap-4 rounded-[24px] p-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-muted">Experience</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Amazon", "Flipkart"].map((co) => (
                <span
                  key={co}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ink"
                >
                  {co}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card flex flex-col justify-center rounded-[24px] p-5">
          <p className="text-[10px] uppercase tracking-[0.26em] text-muted">Focus</p>
          <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-ink">
            Production reliability
          </p>
          <p className="mt-1 text-sm text-muted">at scale</p>
        </div>
      </div>
    </div>
  );
}
