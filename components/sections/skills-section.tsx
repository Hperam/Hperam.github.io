"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { useState } from "react";

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
          <div className="terminal-authentic relative overflow-hidden rounded-xl border border-[#2a2e3a] bg-[#0d1117] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">

            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-[#21262d] bg-[#161b22] px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 text-center font-mono text-[11px] text-[#484f58]">
                ~/config/stack.yml
              </span>
            </div>

            {/* Code body */}
            <div className="p-5 font-mono text-[13px] leading-7">
              {portfolio.skillGroups.map((group, gi) => {
                const isOpen = activeGroup === gi;
                const lineBase = gi * 2 + 1;

                return (
                  <div key={group.title}>
                    <button
                      type="button"
                      onClick={() => setActiveGroup(isOpen ? null : gi)}
                      className="flex w-full text-left transition-colors duration-150 rounded hover:bg-[#161b22]"
                    >
                      <span className="inline-block w-8 select-none text-right text-[#3b4048]">
                        {lineBase}
                      </span>
                      <span className="ml-4 flex items-center gap-2">
                        <span className="text-[#3b4048] text-[10px] w-3">
                          {isOpen ? "▾" : "▸"}
                        </span>
                        <span className="text-[#79c0ff]">
                          {group.title.toLowerCase().replace(/ \/ /g, "_").replace(/ /g, "_")}
                        </span>
                        <span className="text-[#6e7681]">:</span>
                        <span className="text-[#3b4048] italic text-[12px]">
                          {categoryComments[group.title]}
                        </span>
                        {!isOpen && (
                          <span className="ml-2 rounded bg-[#1c2128] px-2 py-0.5 text-[10px] text-[#484f58] border border-[#21262d]">
                            {group.items.length}
                          </span>
                        )}
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        maxHeight: isOpen ? `${group.items.length * 28 + 8}px` : "0px",
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      {group.items.map((item, ii) => (
                        <div key={item} className="group flex">
                          <span className="inline-block w-8 select-none text-right text-[#3b4048]">
                            {lineBase + 1 + ii}
                          </span>
                          <span className="ml-4 pl-5">
                            <span className="text-[#6e7681]">- </span>
                            <span className="text-[#e6edf3] transition duration-150 group-hover:text-[#ffa657]">
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
            <div className="flex items-center justify-between border-t border-[#21262d] bg-[#161b22] px-5 py-2 font-mono text-[11px]">
              <span className="text-[#484f58]">YAML · UTF-8</span>
              <span className="text-[#484f58]">
                {portfolio.skillGroups.reduce((sum, g) => sum + g.items.length, 0)} technologies · {portfolio.skillGroups.length} categories
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
