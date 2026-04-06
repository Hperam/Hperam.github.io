"use client";

import { useState, useRef } from "react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

const projects = portfolio.projects;

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const prev = () => {
    const next = (active - 1 + projects.length) % projects.length;
    setActive(next);
    scrollToCard(next);
  };

  const next = () => {
    const n = (active + 1) % projects.length;
    setActive(n);
    scrollToCard(n);
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const project = projects[active];

  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] space-y-10">
        <Reveal className="max-w-3xl">
          <p className="section-label">Featured Projects</p>
          <h2 className="section-heading">
            Built end-to-end, from architecture through tests and deployment.
          </h2>
          <p className="section-copy">
            Production-grade systems covering backend infrastructure, distributed messaging,
            ML tooling, and AI product work.
          </p>
        </Reveal>

        {/* Featured active card */}
        <Reveal>
          <div className="project-spotlight relative">
            <div className="project-glow" />
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-brand">
                    {project.status}
                  </p>
                  <h3 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-ink">
                    {project.title}
                  </h3>
                </div>
                <span className="rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-brand">
                  {active + 1} / {projects.length}
                </span>
              </div>

              {/* Summary */}
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {project.summary}
              </p>

              {/* Stats */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="project-stat">
                  <span className="project-stat-label">Impact</span>
                  <span className="project-stat-value">{project.impact}</span>
                </div>
                <div className="project-stat">
                  <span className="project-stat-label">Scope</span>
                  <span className="project-stat-value">{project.role}</span>
                </div>
                <div className="project-stat">
                  <span className="project-stat-label">Outcome</span>
                  <span className="project-stat-value">{project.result}</span>
                </div>
              </div>

              {/* Tech pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.tech.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>

              {/* Links + nav */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <MagneticButton
                      key={link.label}
                      href={link.href}
                      target={"target" in link ? (link as { target?: string }).target : undefined}
                    >
                      {link.label}
                    </MagneticButton>
                  ))}
                </div>

                {/* Arrow controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    aria-label="Previous project"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:border-brand/30 hover:text-brand"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next project"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:border-brand/30 hover:text-brand"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Scrollable project strip */}
        <div className="relative">
          <div
            ref={trackRef}
            className="projects-track flex gap-4 overflow-x-auto pb-2"
          >
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => { setActive(i); }}
                className={`projects-track-card group flex-shrink-0 cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                  i === active
                    ? "border-brand/40 bg-brand/10"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                }`}
              >
                <p className={`text-xs uppercase tracking-[0.24em] transition-colors ${
                  i === active ? "text-brand" : "text-muted"
                }`}>
                  {p.status}
                </p>
                <h4 className={`mt-2 text-sm font-semibold transition-colors ${
                  i === active ? "text-ink" : "text-ink/70 group-hover:text-ink"
                }`}>
                  {p.title}
                </h4>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted/70">
                  {p.impact}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); scrollToCard(i); }}
              aria-label={`Go to project ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "h-2 w-6 bg-brand"
                  : "h-2 w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
