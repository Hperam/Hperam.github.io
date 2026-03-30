"use client";

import { motion } from "framer-motion";

import { HeroAiVisual } from "@/components/hero-ai-visual";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-8 pt-24">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-brand"
          >
            Open to SDE 2 opportunities
          </motion.p>
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="font-display text-5xl font-semibold tracking-[-0.075em] text-ink md:text-7xl xl:text-[6.2rem]"
            >
              <span className="block">{portfolio.name.split(" ").slice(0, 2).join(" ")}</span>
              <span className="hero-title-gradient block">
                {portfolio.name.split(" ").slice(2).join(" ")}
              </span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.16 }}
              className="max-w-3xl text-2xl leading-[1.05] tracking-[-0.05em] text-ink/90 md:text-4xl xl:text-5xl"
            >
              {portfolio.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24 }}
              className="max-w-2xl text-base leading-8 text-muted md:text-lg"
            >
              {portfolio.intro}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton href="#projects">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Me
            </MagneticButton>
            <MagneticButton href="/resume/Harshith-Sai-Peram-Resume.pdf" variant="ghost">
              Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="flex flex-wrap gap-6 text-sm text-muted"
          >
            {portfolio.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          <div className="marquee-shell">
            <div className="marquee-track">
              {[...portfolio.spotlight, ...portfolio.spotlight].map((item, index) => (
                <span key={`${item}-${index}`} className="marquee-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <HeroAiVisual />
        </div>
      </div>
    </section>
  );
}
