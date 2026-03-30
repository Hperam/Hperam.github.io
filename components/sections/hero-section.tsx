"use client";

import { motion } from "framer-motion";

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
              {portfolio.name}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card relative overflow-hidden rounded-[32px] p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,162,255,0.24),_transparent_40%)]" />
            <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
            <div className="relative grid gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">
                    Systems + Product
                  </p>
                  <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-ink">
                    Engineering with cinematic polish.
                  </h3>
                </div>
                <div className="profile-core">
                  <div className="profile-ring" />
                  <div className="profile-ring profile-ring-delayed" />
                  <div className="profile-center">HSP</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {portfolio.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/8 bg-white/[0.03] p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-ink">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] border border-brand/20 bg-brand/10 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-brand">
                  Current focus
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-ink/88">
                  Building recruiter-winning portfolio experiences, AI product demos,
                  and backend-heavy case studies that show system design depth and
                  product craftsmanship in the same surface.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.34 }}
            className="mt-6 grid gap-4 md:grid-cols-3"
          >
            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Recruiter signal
              </p>
              <p className="mt-3 text-base leading-7 text-ink/88">
                Backend depth, AI fluency, and strong product taste in one surface.
              </p>
            </div>
            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Role target
              </p>
              <p className="mt-3 text-base leading-7 text-ink/88">
                SDE 2 roles across platform, full-stack, and AI-forward product teams.
              </p>
            </div>
            <div className="surface-card p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                Live proof
              </p>
              <p className="mt-3 text-base leading-7 text-ink/88">
                Includes a real interactive Commerce Copilot demo and polished case studies.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
