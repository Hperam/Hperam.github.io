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
            A stack built for backend systems, full-stack delivery, and AI-enabled products.
          </h2>
          <p className="section-copy">
            The mix is intentional: backend rigor, cloud depth, and enough product
            engineering range to ship complete experiences without leaning into pure frontend positioning.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.04} className="h-full">
              <TiltCard className="skill-card flex h-full flex-col">
                <p className="text-sm uppercase tracking-[0.26em] text-brand">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-1 flex-wrap content-start gap-3">
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
