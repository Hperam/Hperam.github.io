import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="px-4 pb-12 pt-4">
      <div className="surface-card mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-4 px-6 py-5 text-sm text-muted md:flex-row md:items-center">
        <p>
          {portfolio.name} • Crafted for recruiter impact, performance, and story clarity.
        </p>
        <div className="flex flex-wrap gap-5">
          {portfolio.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition hover:text-ink">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
