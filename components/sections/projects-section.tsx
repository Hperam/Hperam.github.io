import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">
        <Reveal className="max-w-3xl">
          <p className="section-label">Featured Projects</p>
          <h2 className="section-heading">
            Product-style case studies designed to impress the moment they open.
          </h2>
          <p className="section-copy">
            Each project is presented like a shipped product, with strong narrative,
            engineering challenge framing, and measurable outcome positioning.
          </p>
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <TiltCard className="project-spotlight">
              <div className="project-glow" />
              <div className="relative z-10 grid gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-brand">
                      {portfolio.projects[0].status}
                    </p>
                    <h3 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-ink">
                      {portfolio.projects[0].title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-brand">
                    Multimodal commerce
                  </span>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-muted">
                  {portfolio.projects[0].summary}
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="project-stat">
                    <span className="project-stat-label">Role</span>
                    <span className="project-stat-value">{portfolio.projects[0].role}</span>
                  </div>
                  <div className="project-stat">
                    <span className="project-stat-label">Impact</span>
                    <span className="project-stat-value">{portfolio.projects[0].impact}</span>
                  </div>
                  <div className="project-stat">
                    <span className="project-stat-label">Result</span>
                    <span className="project-stat-value">{portfolio.projects[0].result}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {portfolio.projects[0].tech.map((item) => (
                    <span key={item} className="skill-pill">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {portfolio.projects[0].links.map((link) => (
                    <MagneticButton key={link.label} href={link.href}>
                      {link.label}
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="grid gap-6">
            {portfolio.projects.slice(1).map((project, index) => (
              <Reveal key={project.title} delay={index * 0.08}>
                <TiltCard className="project-card">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-muted">
                      {project.status}
                    </span>
                    <span className="text-sm text-brand">{project.impact}</span>
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-8 text-muted">{project.summary}</p>
                  <p className="mt-4 text-sm uppercase tracking-[0.22em] text-muted">
                    Result
                  </p>
                  <p className="mt-2 leading-7 text-ink/88">{project.result}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.tech.map((item) => (
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
      </div>
    </section>
  );
}
