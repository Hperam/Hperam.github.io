const orbitItems = [
  { label: "Backend", angle: 0 },
  { label: "Cloud", angle: 60 },
  { label: "AI", angle: 120 },
  { label: "Full-stack", angle: 180 },
  { label: "Data", angle: 240 },
  { label: "DevOps", angle: 300 }
];

const innerItems = [
  { label: "Java", angle: 30 },
  { label: "AWS", angle: 150 },
  { label: "React", angle: 270 }
];

export function HeroAiVisual() {
  return (
    <div className="hero-enter hero-stagger-7 relative flex items-center justify-center">
      <div className="hero-orbit-container relative aspect-square w-full max-w-[520px]">

        {/* Ambient glows */}
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[80px]" style={{ animation: "glow-pulse 6s ease-in-out infinite alternate" }} />
        <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[60px]" style={{ animation: "glow-pulse 8s ease-in-out infinite alternate-reverse" }} />

        {/* Outer orbit ring */}
        <div className="hero-orbit-outer absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

        {/* Inner orbit ring */}
        <div className="hero-orbit-inner absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/[0.12]" />

        {/* Dashed middle ring */}
        <div className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.04]" />

        {/* Outer orbit nodes — rotate the whole group */}
        <div className="hero-spin-slow absolute inset-0">
          {orbitItems.map((item) => (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${item.angle}deg) translateY(-46%) rotate(-${item.angle}deg)`,
                transformOrigin: "0 0"
              }}
            >
              <div
                className="hero-spin-slow-reverse flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-panel/80 px-3 py-1.5 shadow-lg backdrop-blur-xl"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                <span className="text-[11px] font-medium tracking-wide text-ink/90">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Inner orbit nodes — rotate opposite */}
        <div className="hero-spin-medium-reverse absolute inset-0">
          {innerItems.map((item) => (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${item.angle}deg) translateY(-29%) rotate(-${item.angle}deg)`,
                transformOrigin: "0 0"
              }}
            >
              <div
                className="hero-spin-medium flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-accent/20 bg-panel/70 px-2.5 py-1 shadow-md backdrop-blur-lg"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[10px] font-medium text-ink/80">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 4) * 18}%`,
              animation: `float-gentle ${4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
              boxShadow: "0 0 8px rgba(255,255,255,0.3)"
            }}
          />
        ))}

        {/* Center core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Glow ring */}
          <div className="absolute -inset-4 rounded-full border border-brand/20" style={{ animation: "glow-pulse 3s ease-in-out infinite alternate" }} />
          <div className="absolute -inset-8 rounded-full border border-brand/10" />

          {/* Core orb */}
          <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/15 shadow-[0_0_60px_rgb(var(--brand)/0.3),0_0_120px_rgb(var(--accent)/0.15)]"
            style={{
              background: "radial-gradient(circle at 35% 35%, rgb(var(--brand) / 0.4), rgb(var(--accent) / 0.2) 60%, rgb(var(--panel) / 0.9))"
            }}
          >
            <div className="text-center">
              <p className="font-display text-2xl font-bold tracking-[-0.05em] text-ink">HP</p>
              <p className="text-[8px] uppercase tracking-[0.3em] text-muted">SDE</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
