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
  const [activeGroup, setActiveGroup] = useState(0);

  // Build line numbers and YAML-style content
  let lineNum = 1;
  const blocks = portfolio.skillGroups.map((group, gi) => {
    const startLine = lineNum;
    lineNum++; // category line
    lineNum++; // comment line
    const itemLines = group.items.map(() => {
      const ln = lineNum;
      lineNum++;
      return ln;
    });
    lineNum++; // blank line
    return { ...group, startLine, itemLines, index: gi };
  });

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

            <div className="flex">
              {/* Sidebar — category tabs */}
              <div className="hidden w-48 shrink-0 border-r border-white/[0.06] py-3 md:block">
                {portfolio.skillGroups.map((group, i) => (
                  <button
                    key={group.title}
                    type="button"
                    onClick={() => setActiveGroup(i)}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[12px] transition ${
                      activeGroup === i
                        ? "border-r-2 border-brand bg-white/[0.04] text-white"
                        : "text-white/35 hover:bg-white/[0.02] hover:text-white/60"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${activeGroup === i ? "bg-brand" : "bg-white/15"}`} />
                    {group.title}
                  </button>
                ))}
              </div>

              {/* Mobile tabs */}
              <div className="flex w-full gap-1 overflow-x-auto border-b border-white/[0.06] px-3 py-2 md:hidden">
                {portfolio.skillGroups.map((group, i) => (
                  <button
                    key={group.title}
                    type="button"
                    onClick={() => setActiveGroup(i)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] transition ${
                      activeGroup === i
                        ? "bg-white/10 text-white"
                        : "text-white/35 hover:text-white/60"
                    }`}
                  >
                    {group.title}
                  </button>
                ))}
              </div>

              {/* Code editor body */}
              <div className="flex-1 overflow-x-auto">
                <div className="p-5 font-mono text-[13px] leading-7">
                  {blocks.map((block) => (
                    <div
                      key={block.title}
                      className={`transition-all duration-300 ${
                        block.index === activeGroup
                          ? "opacity-100"
                          : "opacity-30 hover:opacity-50"
                      }`}
                      onClick={() => setActiveGroup(block.index)}
                    >
                      {/* Category key */}
                      <div className="flex">
                        <span className="inline-block w-8 select-none text-right text-white/15">
                          {block.startLine}
                        </span>
                        <span className="ml-4">
                          <span className={categoryColors[block.title] || "text-sky-400"}>
                            {block.title.toLowerCase().replace(/ \/ /g, "_").replace(/ /g, "_")}
                          </span>
                          <span className="text-white/30">:</span>
                          <span className="ml-3 text-white/20 italic">
                            {categoryComments[block.title]}
                          </span>
                        </span>
                      </div>

                      {/* Items as YAML list */}
                      {block.items.map((item, ii) => (
                        <div key={item} className="group flex">
                          <span className="inline-block w-8 select-none text-right text-white/15">
                            {block.itemLines[ii]}
                          </span>
                          <span className="ml-4">
                            <span className="text-white/30">  - </span>
                            <span className={`transition duration-200 ${
                              block.index === activeGroup
                                ? "text-white/90 group-hover:text-brand"
                                : "text-white/40"
                            }`}>
                              {item}
                            </span>
                          </span>
                        </div>
                      ))}

                      {/* Blank line */}
                      <div className="h-7" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2 text-[11px]">
              <div className="flex items-center gap-4">
                <span className="text-white/25">YAML</span>
                <span className="text-white/25">UTF-8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/25">
                  {portfolio.skillGroups.reduce((sum, g) => sum + g.items.length, 0)} technologies
                </span>
                <span className="text-white/15">·</span>
                <span className="text-white/25">{portfolio.skillGroups.length} categories</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
