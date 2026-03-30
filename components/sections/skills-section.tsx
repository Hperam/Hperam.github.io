import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

export function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">
        <Reveal className="max-w-3xl">
          <p className="section-label">Tech Stack</p>
          <h2 className="section-heading">
            A stack that spans interface polish, systems reliability, and intelligent products.
          </h2>
          <p className="section-copy">
            The mix is intentional: frontend craft, backend rigor, cloud depth, and
            modern AI integration without sacrificing maintainability.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.04}>
              <TiltCard className="skill-card">
                <p className="text-sm uppercase tracking-[0.26em] text-brand">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
