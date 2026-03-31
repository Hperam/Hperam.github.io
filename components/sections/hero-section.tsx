import { HeroAiVisual } from "@/components/hero-ai-visual";
import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SocialLinks } from "@/components/ui/social-links";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-8 pt-24">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0 space-y-8">
          <p className="hero-enter hero-stagger-1 inline-flex rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-brand">
            Open to software engineer roles
          </p>
          <div className="space-y-6">
            <h1 className="hero-enter hero-stagger-2 font-display text-5xl font-semibold tracking-[-0.075em] text-ink md:text-7xl xl:text-[6.2rem]">
              <span className="block">{portfolio.name.split(" ").slice(0, 2).join(" ")}</span>
              <span className="hero-title-gradient block">
                {portfolio.name.split(" ").slice(2).join(" ")}
              </span>
            </h1>
            <h2 className="hero-enter hero-stagger-3 max-w-3xl text-2xl leading-[1.05] tracking-[-0.05em] text-ink/90 md:text-4xl xl:text-5xl">
              {portfolio.title}
            </h2>
            <p className="hero-enter hero-stagger-4 max-w-2xl text-base leading-8 text-muted md:text-lg">
              {portfolio.intro}
            </p>
          </div>

          <div className="hero-enter hero-stagger-5 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Me
            </MagneticButton>
            <MagneticButton href="/resume/Harshith-Sai-Peram-Resume.pdf" variant="secondary">
              Download Resume
            </MagneticButton>
            <SocialLinks labels={["GitHub", "LinkedIn"]} />
          </div>

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
