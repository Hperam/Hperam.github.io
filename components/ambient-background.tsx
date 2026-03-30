"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${5 + index * 5}%`,
  top: `${10 + (index % 6) * 13}%`,
  duration: 8 + (index % 5),
  delay: index * 0.15
}));

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgb(var(--brand) / 0.26), transparent 28%), radial-gradient(circle at 20% 20%, rgb(var(--accent) / 0.14), transparent 22%), radial-gradient(circle at 80% 10%, rgb(var(--brand) / 0.16), transparent 20%)"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%)]" />
      <div className="noise-mask absolute inset-0 opacity-[0.08]" />
      <motion.div
        className="absolute left-[10%] top-[12%] h-64 w-64 rounded-full bg-brand/20 blur-3xl"
        animate={{ y: [0, -30, 10], x: [0, 35, -15], scale: [0.96, 1.08, 0.98] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[8%] top-[20%] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, 25, -10], x: [0, -25, 20], scale: [1, 0.94, 1.04] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[40%] h-56 w-56 rounded-full bg-white/10 blur-3xl"
        animate={{ y: [0, -20, 15], scale: [1, 1.08, 0.96] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[30%] top-[54%] h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgb(var(--accent) / 0.12)" }}
        animate={{ x: [0, 18, -10], y: [0, -12, 12], scale: [0.9, 1.05, 0.94] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/40 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 6], opacity: [0.25, 0.85, 0.2] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
