import { portfolio } from "@/data/portfolio";

const highlights = [
  { label: "Years building", value: "5+", icon: "⚡" },
  { label: "Annual savings", value: "$2M", icon: "📈" },
  { label: "Post-launch fallback", value: "<0.1%", icon: "🛡" }
];

const capabilities = [
  { name: "Backend platforms", desc: "High-scale services" },
  { name: "Cloud-native systems", desc: "AWS, Docker, Terraform" },
  { name: "AI product engineering", desc: "RAG, structured outputs" },
  { name: "Full-stack delivery", desc: "APIs to shipped UIs" }
];

export function HeroAiVisual() {
  return (
    <div className="hero-enter hero-stagger-7 grid gap-3">
      {/* Hero card — main visual with mesh background */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6">
        {/* Animated gradient mesh */}
        <div className="hero-visual-grid absolute inset-0 opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgb(var(--brand) / 0.2), transparent 50%), radial-gradient(ellipse at 90% 90%, rgb(var(--accent) / 0.15), transparent 45%)"
          }}
        />
        <div className="shimmer-line absolute inset-x-0 top-0 h-px" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" style={{ animation: "glow-pulse 2s ease-in-out infinite alternate" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
                Building at Amazon
              </span>
            </div>
            <span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-brand">
              2022 - Present
            </span>
          </div>

          {/* Capabilities grid */}
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {capabilities.map((cap, i) => (
              <div
                key={cap.name}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition duration-300 hover:border-brand/20 hover:bg-white/[0.06]"
              >
                <div
                  className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: i % 2 === 0
                      ? "radial-gradient(circle at 20% 80%, rgb(var(--brand) / 0.08), transparent 60%)"
                      : "radial-gradient(circle at 80% 20%, rgb(var(--accent) / 0.08), transparent 60%)"
                  }}
                />
                <p className="relative text-sm font-medium tracking-[-0.02em] text-ink">{cap.name}</p>
                <p className="relative mt-1.5 text-[12px] text-muted">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row — stats */}
      <div className="grid grid-cols-3 gap-3">
        {highlights.map((item, i) => (
          <div
            key={item.label}
            className={`relative overflow-hidden rounded-[22px] border p-5 transition duration-300 hover:scale-[1.02] ${
              i === 0
                ? "border-brand/20 bg-gradient-to-br from-brand/[0.12] via-white/[0.03] to-accent/[0.08]"
                : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12]"
            }`}
          >
            {i === 0 && (
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: "radial-gradient(circle at 30% 0%, rgb(var(--brand) / 0.15), transparent 50%)"
                }}
              />
            )}
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
                  {item.label}
                </p>
                <span className="text-base">{item.icon}</span>
              </div>
              <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-ink">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Company bar */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Shipped at</p>
        <div className="h-3 w-px bg-white/10" />
        {["Amazon", "Flipkart", "UB"].map((co) => (
          <span
            key={co}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[-0.01em] text-ink/80"
          >
            {co}
          </span>
        ))}
      </div>
    </div>
  );
}
