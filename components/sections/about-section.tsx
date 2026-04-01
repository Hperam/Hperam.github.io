"use client";

import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

const values = [
  {
    number: "01",
    title: "Correctness before cleverness",
    body: "A system that's elegant but wrong ships bugs. I optimise for clear contracts, predictable behaviour, and data you can trust before reaching for clever abstractions.",
  },
  {
    number: "02",
    title: "Own it end to end",
    body: "The boundary between backend and frontend, or service and infra, is just a line on a diagram. I follow the problem wherever it lives and take responsibility for the full outcome.",
  },
  {
    number: "03",
    title: "Production is the truth",
    body: "Staging is a hypothesis. I lean on observability, rollout safety, and real metrics — because systems only prove themselves under real traffic with real consequences.",
  },
  {
    number: "04",
    title: "Simplicity is the hard part",
    body: "Anyone can add complexity. Knowing what to leave out — the right abstraction, the minimal API, the data model that stays clean at scale — is where most of the real work is.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">

        {/* Header */}
        <Reveal className="max-w-2xl">
          <p className="section-label">About</p>
          <h2 className="section-heading">
            How I think about engineering.
          </h2>
          <p className="section-copy">
            Not the resume — the principles. The things that shape every technical decision I make, regardless of stack or company.
          </p>
        </Reveal>

        {/* Values grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.number} delay={i * 0.06}>
              <TiltCard className="group h-full rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-panel transition-colors duration-300 hover:border-brand/30 hover:bg-brand/[0.04]">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs font-semibold text-brand/60">{v.number}</span>
                  <div className="h-px flex-1 self-center bg-white/8 transition-colors duration-300 group-hover:bg-brand/20" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.04em] text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-muted">{v.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
