"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function AboutSection() {
  const points = portfolio.aboutPoints as { tag: string; text: string }[];
  const strengths = (portfolio as typeof portfolio & {
    strengths: { label: string; tags: string[] }[];
  }).strengths;

  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-8">

        {/* ── Header ── */}
        <Reveal className="max-w-3xl">
          <p className="section-label">About</p>
          <h2 className="section-heading">
            Backend-first. Full-stack when it matters. Production-obsessed always.
          </h2>
          <p className="section-copy">{portfolio.about}</p>
        </Reveal>

        {/* ── Bento grid ── */}
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">

          {/* Left — career timeline card */}
          <Reveal>
            <TiltCard className="h-full rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-panel">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Career arc
              </p>
              <div className="relative space-y-0 pl-6">
                {/* connecting line */}
                <div className="absolute left-0 top-2 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-brand/60 via-accent/40 to-transparent" />

                {points.map((point, i) => (
                  <div key={i} className="relative pb-10 last:pb-0">
                    {/* dot */}
                    <div className="absolute -left-[1.4rem] top-[0.35rem] h-3 w-3 rounded-full border-2 border-brand bg-surface shadow-[0_0_8px_rgb(var(--brand)/0.5)]" />
                    <span className="inline-block rounded-full border border-brand/25 bg-brand/10 px-3 py-0.5 text-[11px] font-medium tracking-wide text-brand">
                      {point.tag}
                    </span>
                    <p className="mt-3 text-[15px] leading-7 text-muted">{point.text}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>

          {/* Right — status + impact stacked */}
          <div className="flex flex-col gap-5">

            {/* Amazon status card — always dark */}
            <Reveal delay={0.05}>
              <div className="relative overflow-hidden rounded-[28px] border border-[#30363d] bg-[#0d1117] p-6 shadow-panel">
                {/* subtle glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,rgba(110,96,255,0.12),transparent_55%)]" />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7ee787]">
                      Currently
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ee787] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ee787]" />
                      </span>
                      Active
                    </span>
                  </div>
                  <p className="font-mono text-2xl font-semibold text-[#e6edf3]">Amazon</p>
                  <p className="mt-1 text-sm text-[#8b949e]">Software Engineer · Seattle, WA</p>
                  <div className="mt-5 space-y-2 border-t border-[#21262d] pt-5">
                    <div className="flex items-start gap-2 text-sm text-[#8b949e]">
                      <span className="mt-0.5 text-[#ffa657]">▸</span>
                      <span>Fulfillment simulation · demand forecasting</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-[#8b949e]">
                      <span className="mt-0.5 text-[#ffa657]">▸</span>
                      <span>Production data pipelines · cloud-native AWS</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-[#8b949e]">
                      <span className="mt-0.5 text-[#79c0ff]">▸</span>
                      <span>2022 — present</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* $2M Impact card */}
            <Reveal delay={0.1}>
              <TiltCard className="relative overflow-hidden rounded-[28px] border border-brand/25 bg-gradient-to-br from-brand/20 via-white/[0.04] to-accent/14 p-7 shadow-panel">
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-accent/15 blur-2xl" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand">
                    Impact highlight
                  </p>
                  <p className="mt-4 bg-gradient-to-r from-ink via-brand to-accent bg-clip-text text-6xl font-bold tracking-[-0.06em] text-transparent">
                    $2M
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    In annual savings unlocked through rollout safety, simulation quality, and production improvements at Amazon.
                  </p>
                  <div className="mt-5 flex gap-4 border-t border-white/8 pt-5 text-center">
                    <div>
                      <p className="text-lg font-semibold text-ink">&lt;0.1%</p>
                      <p className="text-[11px] uppercase tracking-wide text-muted">Fallback rate</p>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div>
                      <p className="text-lg font-semibold text-ink">16 wks</p>
                      <p className="text-[11px] uppercase tracking-wide text-muted">Forecast horizon</p>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div>
                      <p className="text-lg font-semibold text-ink">5+ yrs</p>
                      <p className="text-[11px] uppercase tracking-wide text-muted">Experience</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>

        {/* ── Strength cards ── */}
        {strengths && (
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {strengths.map((s, i) => (
                <TiltCard
                  key={s.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 shadow-panel"
                >
                  <div
                    className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-sm font-bold text-brand"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="font-semibold tracking-[-0.03em] text-ink">{s.label}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
