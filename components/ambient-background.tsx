export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Static radial gradients */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgb(var(--brand) / 0.26), transparent 28%), radial-gradient(circle at 20% 20%, rgb(var(--accent) / 0.14), transparent 22%), radial-gradient(circle at 80% 10%, rgb(var(--brand) / 0.16), transparent 20%)"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%)]" />
      <div className="noise-mask absolute inset-0 opacity-[0.08]" />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgb(var(--brand) / 0.2), transparent 50%), radial-gradient(ellipse at 80% 70%, rgb(var(--accent) / 0.15), transparent 50%), radial-gradient(ellipse at 50% 50%, rgb(var(--brand) / 0.1), transparent 60%)",
          backgroundSize: "120% 120%",
          animation: "mesh-drift 20s ease-in-out infinite"
        }}
      />

      {/* 3 CSS-animated orbs */}
      <div
        className="absolute left-[10%] top-[12%] h-64 w-64 rounded-full bg-brand/20 blur-3xl will-change-transform"
        style={{ animation: "float-orb-1 14s ease-in-out infinite" }}
      />
      <div
        className="absolute right-[8%] top-[20%] h-72 w-72 rounded-full bg-accent/20 blur-3xl will-change-transform"
        style={{ animation: "float-orb-2 18s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[8%] left-[40%] h-56 w-56 rounded-full bg-white/10 blur-3xl will-change-transform"
        style={{ animation: "float-orb-3 16s ease-in-out infinite" }}
      />
    </div>
  );
}
