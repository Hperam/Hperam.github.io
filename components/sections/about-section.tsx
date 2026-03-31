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
            Backend-first engineering with full-stack ownership when the product needs it.
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
            <TiltCard className="rounded-[28px] border border-brand/20 bg-gradient-to-br from-brand/18 via-white/[0.06] to-accent/12 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.24em] text-brand">
                Impact Highlight
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-ink">
                $2M
              </p>
              <p className="mt-3 text-lg leading-8 text-ink/90">
                in annual savings unlocked through rollout safety, simulation quality, and production improvements at Amazon.
              </p>
            </TiltCard>
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
