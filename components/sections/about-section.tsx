import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">
        <Reveal className="max-w-3xl">
          <p className="section-label">About</p>
          <h2 className="section-heading">
            Technical depth with a product eye for what feels premium.
          </h2>
          <p className="section-copy">{portfolio.about}</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="grid gap-4">
            {portfolio.aboutPoints.map((point, index) => (
              <TiltCard
                key={point}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-panel"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                    0{index + 1}
                  </span>
                  <p className="leading-8 text-muted">{point}</p>
                </div>
              </TiltCard>
            ))}
          </Reveal>

          <Reveal className="grid gap-4">
            {portfolio.metrics.map((metric) => (
              <TiltCard
                key={metric.label}
                className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-6"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-4 text-lg leading-8 text-ink/90">{metric.detail}</p>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
