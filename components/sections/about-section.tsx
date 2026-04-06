"use client";

import { Reveal } from "@/components/ui/reveal";

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
      <div className="mx-auto max-w-[1240px]">

        {/* Header */}
        <Reveal className="max-w-2xl mb-16">
          <p className="section-label">Values</p>
          <h2 className="section-heading">
            How I think about engineering.
          </h2>
          <p className="section-copy">
            Not the resume — the principles. The things that shape every technical decision I make, regardless of stack or company.
          </p>
        </Reveal>

        {/* Stacked list */}
        <div className="divide-y divide-white/[0.07]">
          {values.map((v, i) => (
            <Reveal key={v.number} delay={i * 0.07}>
              <div className="group relative flex items-start gap-8 py-10 transition-colors duration-300 sm:gap-12 md:gap-16">
                {/* Hover left accent */}
                <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 rounded-full bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />

                {/* Number */}
                <span className="shrink-0 pl-5 font-mono text-5xl font-bold leading-none text-white/[0.07] transition-colors duration-300 group-hover:text-brand/25 sm:text-6xl md:text-7xl">
                  {v.number}
                </span>

                {/* Content */}
                <div className="flex-1 pb-1 pt-2">
                  <h3 className="text-xl font-semibold tracking-[-0.04em] text-ink transition-colors duration-300 group-hover:text-white sm:text-2xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
                    {v.body}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="mt-3 shrink-0 pr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand">
                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
