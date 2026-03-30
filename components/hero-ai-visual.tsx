"use client";

import { motion, useReducedMotion } from "framer-motion";

import { portfolio } from "@/data/portfolio";

const orbitNodes = [
  { label: "Signal Routing", left: "10%", top: "16%", delay: 0.1 },
  { label: "Ranking", left: "76%", top: "14%", delay: 0.25 },
  { label: "Narrative", left: "84%", top: "44%", delay: 0.4 },
  { label: "Reliability", left: "66%", top: "78%", delay: 0.55 },
  { label: "Inference", left: "17%", top: "74%", delay: 0.7 },
  { label: "Product Taste", left: "4%", top: "48%", delay: 0.85 }
];

const floatingPanels = [
  {
    title: "Adaptive motion",
    copy: "Framer-driven depth, signal pulses, and procedural layering.",
    className: "left-0 top-12 w-52 lg:-left-8"
  },
  {
    title: "System story",
    copy: "Backend credibility translated into a recruiter-readable surface.",
    className: "right-0 top-10 w-56 lg:-right-10"
  },
  {
    title: "AI-first polish",
    copy: "High-context visuals that feel alive instead of template-driven.",
    className: "bottom-5 right-8 w-60"
  }
];

const streamRows = [0, 1, 2, 3, 4];
const signalDots = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${8 + (index % 6) * 15}%`,
  top: `${10 + Math.floor(index / 6) * 20}%`,
  delay: index * 0.08
}));

export function HeroAiVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      className="hero-visual-shell surface-card relative min-h-[560px] overflow-hidden rounded-[36px] p-4 sm:p-6"
    >
      <div className="hero-visual-grid absolute inset-0 opacity-70" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 20% 18%, rgb(var(--brand) / 0.24), transparent 28%), radial-gradient(circle at 84% 18%, rgb(var(--accent) / 0.28), transparent 24%), radial-gradient(circle at 50% 80%, rgb(var(--brand) / 0.16), transparent 30%)"
        }}
      />
      <motion.div
        className="absolute inset-x-[-20%] top-24 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(var(--brand) / 0.9), rgb(var(--accent) / 0.8), transparent)"
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ["-8%", "10%", "-8%"],
                opacity: [0.3, 1, 0.3]
              }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {signalDots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            background: "rgb(var(--brand) / 0.9)",
            boxShadow: "0 0 20px rgb(var(--accent) / 0.45)"
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.15, 0.85, 0.2],
                  scale: [0.8, 1.35, 0.85]
                }
          }
          transition={{
            duration: 2.4 + (dot.id % 4),
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="relative h-full min-h-[528px]">
        <motion.div
          className="absolute left-1/2 top-[49%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--brand) / 0.22) 0%, rgb(var(--accent) / 0.08) 40%, transparent 68%)",
            filter: "blur(18px)"
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [0.96, 1.04, 0.98],
                  opacity: [0.65, 0.9, 0.7]
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-[49%] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-[49%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: "rgb(var(--brand) / 0.22)" }}
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {orbitNodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: node.delay, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{ left: node.left, top: node.top }}
          >
            <motion.div
              className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-ink shadow-panel backdrop-blur-xl"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -8 - (index % 3) * 2, 0]
                    }
              }
              transition={{
                duration: 4.5 + index,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {node.label}
            </motion.div>
          </motion.div>
        ))}

        {floatingPanels.map((panel, index) => (
          <motion.div
            key={panel.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.22 + index * 0.1 }}
            className={`absolute ${panel.className} rounded-[26px] border border-white/10 bg-white/[0.06] p-4 shadow-panel backdrop-blur-xl`}
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
              {panel.title}
            </p>
            <p className="mt-3 text-sm leading-6 text-ink/80">{panel.copy}</p>
          </motion.div>
        ))}

        <motion.div
          className="absolute left-1/2 top-[49%] w-[min(90%,340px)] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10 bg-black/35 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotateX: [0, 2, 0],
                  rotateY: [0, -2, 0]
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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

          <div className="mt-6 space-y-3">
            {streamRows.map((row) => (
              <div
                key={row}
                className="relative h-11 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <motion.div
                  className="absolute inset-y-0 left-[-28%] w-[52%] rounded-full blur-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgb(var(--brand) / 0.8), rgb(var(--accent) / 0.7), transparent)"
                  }}
                  animate={prefersReducedMotion ? undefined : { x: ["0%", "180%"] }}
                  transition={{
                    duration: 3.2 + row * 0.35,
                    repeat: Infinity,
                    ease: "linear",
                    delay: row * 0.18
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
                    Layer 0{row + 1}
                  </span>
                  <span className="text-sm text-ink/75">
                    {row === 0 && "Context ingestion"}
                    {row === 1 && "Decision framing"}
                    {row === 2 && "UI narrative"}
                    {row === 3 && "Signal quality"}
                    {row === 4 && "Runtime polish"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {portfolio.stats.slice(0, 3).map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-4"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -5 - index, 0]
                      }
                }
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-muted">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-ink">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
