import { portfolio } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-10 pt-2">
      <div className="mx-auto max-w-[1240px]">

        {/* Top gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

        {/* Main footer body */}
        <div className="flex flex-col gap-10 py-10 md:flex-row md:items-start md:justify-between">

          {/* Brand block */}
          <div className="max-w-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/20 text-[11px] font-bold text-brand ring-1 ring-brand/30">
                HP
              </span>
              <span className="text-sm font-semibold tracking-[-0.02em] text-ink">
                {portfolio.name}
              </span>
            </div>
            <p className="text-sm leading-6 text-muted">
              Backend-first engineer. Full-stack when it matters. Building systems that hold up in production.
            </p>
          </div>

          {/* Nav links */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted/60">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {portfolio.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted transition-colors duration-200 hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact block */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted/60">
              Connect
            </p>
            <SocialLinks />
            <a
              href={`mailto:${portfolio.email}`}
              className="block text-sm text-muted transition-colors duration-200 hover:text-brand"
            >
              {portfolio.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-muted/60">
            © {year} {portfolio.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted/40">
            Built with Next.js · Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
