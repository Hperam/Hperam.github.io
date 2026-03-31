"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  "Full-Stack": "text-sky-400",
  "Backend": "text-emerald-400",
  "Cloud / DevOps": "text-amber-400",
  "Databases": "text-violet-400",
  "AI / ML": "text-pink-400",
  "Tools": "text-cyan-400"
};

const categoryComments: Record<string, string> = {
  "Full-Stack": "# UI layer + app architecture",
  "Backend": "# services, APIs, runtime",
  "Cloud / DevOps": "# infra & deployment",
  "Databases": "# persistence & analytics",
  "AI / ML": "# intelligent systems",
  "Tools": "# workflow & observability"
};

export function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

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

        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[rgb(13,17,28)] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
            {/* Animated border glow */}
            <div className="terminal-glow-border absolute -inset-px rounded-[20px] -z-10" />

            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 text-center text-[11px] tracking-wide text-white/30">
                stack.yml — harshith/config
              </span>
            </div>

            {/* Code body */}
            <div className="p-5 font-mono text-[13px] leading-7">
              {portfolio.skillGroups.map((group, gi) => {
                const isOpen = activeGroup === gi;
                const lineBase = gi * 2 + 1;

                return (
                  <div key={group.title}>
                    {/* Category line — clickable */}
                    <button
                      type="button"
                      onClick={() => setActiveGroup(isOpen ? null : gi)}
                      className="flex w-full text-left transition-colors duration-200 hover:bg-white/[0.03] rounded"
                    >
                      <span className="inline-block w-8 select-none text-right text-white/15">
                        {lineBase}
                      </span>
                      <span className="ml-4 flex items-center gap-2">
                        <span className="text-white/25 text-[10px] w-3">
                          {isOpen ? "▾" : "▸"}
                        </span>
                        <span className={categoryColors[group.title] || "text-sky-400"}>
                          {group.title.toLowerCase().replace(/ \/ /g, "_").replace(/ /g, "_")}
                        </span>
                        <span className="text-white/30">:</span>
                        <span className="text-white/20 italic text-[12px]">
                          {categoryComments[group.title]}
                        </span>
                        {!isOpen && (
                          <span className="ml-2 rounded bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/30">
                            {group.items.length}
                          </span>
                        )}
                      </span>
                    </button>

                    {/* Expanded items */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        maxHeight: isOpen ? `${group.items.length * 28 + 8}px` : "0px",
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      {group.items.map((item, ii) => (
                        <div key={item} className="group flex">
                          <span className="inline-block w-8 select-none text-right text-white/15">
                            {lineBase + 1 + ii}
                          </span>
                          <span className="ml-4 pl-5">
                            <span className="text-white/30">- </span>
                            <span className="text-white/90 transition duration-200 group-hover:text-brand">
                              {item}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2 text-[11px]">
              <span className="text-white/25">YAML · UTF-8</span>
              <span className="text-white/25">
                {portfolio.skillGroups.reduce((sum, g) => sum + g.items.length, 0)} technologies · {portfolio.skillGroups.length} categories
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
