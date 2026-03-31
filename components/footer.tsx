import { portfolio } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  return (
    <footer className="px-4 pb-12 pt-4">
      <div className="surface-card mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-5 px-6 py-5 text-sm text-muted xl:flex-row xl:items-center">
        <p>
          {portfolio.name} • Backend systems, full-stack delivery, and AI product execution.
        </p>
        <div className="flex flex-wrap gap-5">
          {portfolio.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition hover:text-ink">
              {item.label}
            </a>
          ))}
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
