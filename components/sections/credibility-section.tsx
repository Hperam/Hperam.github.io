import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function CredibilitySection() {
  return (
    <section id="credibility" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">
        <Reveal className="max-w-3xl">
          <p className="section-label">Credibility</p>
          <h2 className="section-heading">
            Signals that help recruiters trust the engineering story faster.
          </h2>
        </Reveal>

        <Reveal className="flex flex-wrap gap-4">
          {portfolio.credibility.logos.map((logo) => (
            <div
              key={logo}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.28em] text-muted"
            >
              {logo}
            </div>
          ))}
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {portfolio.credibility.testimonials.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.06}>
              <TiltCard className="rounded-[30px] border border-white/10 bg-white/5 p-7 shadow-panel">
                <p className="text-xl leading-9 tracking-[-0.03em] text-ink/92">
                  “{item.quote}”
                </p>
                <div className="mt-8">
                  <p className="text-sm uppercase tracking-[0.24em] text-brand">
                    {item.author}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.title}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {portfolio.credibility.achievements.map((achievement, index) => (
            <Reveal key={achievement} delay={index * 0.04}>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-muted shadow-panel">
                {achievement}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
