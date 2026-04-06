import { portfolio } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pb-10 pt-20">
      <div className="mx-auto max-w-[1240px]">

        {/* Big CTA block */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted/50">
            Available for opportunities
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.06em] text-ink md:text-5xl lg:text-6xl">
            Let&apos;s build something
            <span className="text-brand">.</span>
          </h2>
          <a
            href={`mailto:${portfolio.email}`}
            className="mt-5 inline-block text-sm text-muted transition-colors duration-200 hover:text-brand"
          >
            {portfolio.email}
          </a>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 sm:flex-row">
          <p className="text-[13px] font-medium tracking-[-0.02em] text-ink/60">
            {portfolio.name.split(" ").slice(0, 2).join(" ")}
            <span className="text-brand">.</span>
          </p>

          <SocialLinks />

          <p className="text-xs text-muted/40">
            © {year} · Built with Next.js
          </p>
        </div>

      </div>
    </footer>
  );
}
