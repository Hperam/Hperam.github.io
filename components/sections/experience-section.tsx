import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">
        <Reveal className="max-w-3xl">
          <p className="section-label">Experience</p>
          <h2 className="section-heading">
            A timeline shaped by systems scale, product delivery, and ownership.
          </h2>
        </Reveal>

        <div className="relative ml-3 grid gap-8 border-l border-white/10 pl-8">
          {portfolio.experience.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.06}>
              <article className="timeline-card">
                <span className="timeline-node" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand">
                      {item.company}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-ink">
                      {item.role}
                    </h3>
                  </div>
                  <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted">
                    {item.duration}
                  </p>
                </div>
                <p className="mt-5 leading-8 text-ink/90">{item.highlight}</p>
                <ul className="mt-5 grid gap-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="timeline-bullet">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
