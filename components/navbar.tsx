"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { portfolio } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = portfolio.nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.6],
        rootMargin: "-25% 0px -45% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div
        className={clsx(
          "surface-card mx-auto flex max-w-[1240px] items-center justify-between rounded-[28px] px-4 py-3 transition duration-300 md:px-5",
          scrolled
            ? "border-white/12 bg-panel/88 shadow-panel backdrop-blur-2xl"
            : "border-white/8 bg-panel/60 backdrop-blur-xl"
        )}
      >
        <a href="#hero" className="group flex min-w-0 items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full shadow-[0_0_22px_rgb(var(--brand)/0.75)] transition group-hover:scale-110"
            style={{
              background:
                "linear-gradient(135deg, rgb(var(--brand) / 1), rgb(var(--accent) / 1))"
            }}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium tracking-[-0.03em] text-ink md:text-[0.95rem]">
              {portfolio.name}
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted md:text-[11px]">
              Software Engineer
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.035] p-1.5 lg:flex">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "rounded-full px-4 py-2 text-sm tracking-[-0.02em] transition",
                active === item.id
                  ? "border border-white/10 bg-white/10 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "text-muted hover:bg-white/[0.045] hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-brand/40 hover:text-ink lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <MagneticButton href="#contact" className="hidden md:inline-flex">
            Contact
          </MagneticButton>
        </div>
      </div>

      <div
        className={clsx(
          "surface-card mx-auto mt-3 max-w-[1240px] overflow-hidden rounded-[28px] transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto max-h-[420px] border border-white/10 opacity-100"
            : "pointer-events-none max-h-0 border border-transparent opacity-0"
        )}
      >
        <nav className="grid gap-2 p-4">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMobileMenu}
              className={clsx(
                "rounded-2xl px-4 py-3 text-sm tracking-[-0.02em] transition",
                active === item.id
                  ? "border border-white/10 bg-white/10 text-ink"
                  : "text-muted hover:bg-white/5 hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
          <MagneticButton href="#contact" onClick={closeMobileMenu}>
            Contact
          </MagneticButton>
        </nav>
      </div>
    </header>
  );
}
