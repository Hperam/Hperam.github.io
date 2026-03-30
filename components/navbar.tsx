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
          "mx-auto flex max-w-[1240px] items-center justify-between rounded-full border px-4 py-3 transition duration-300",
          scrolled
            ? "border-white/10 bg-panel/80 shadow-panel backdrop-blur-2xl"
            : "border-white/5 bg-panel/45 backdrop-blur-xl"
        )}
      >
        <a href="#hero" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            H
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted">
              Software Engineer
            </p>
            <p className="text-sm font-medium text-ink">{portfolio.name}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/5 px-2 py-1 lg:flex">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "rounded-full px-4 py-2 text-sm transition",
                active === item.id
                  ? "bg-white/10 text-ink"
                  : "text-muted hover:text-ink"
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
            Start a Conversation
          </MagneticButton>
        </div>
      </div>

      <div
        className={clsx(
          "mx-auto mt-3 max-w-[1240px] overflow-hidden rounded-[32px] border border-white/10 bg-panel/90 shadow-panel backdrop-blur-2xl transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto max-h-[420px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <nav className="grid gap-2 p-4">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMobileMenu}
              className={clsx(
                "rounded-2xl px-4 py-3 text-sm transition",
                active === item.id
                  ? "bg-white/10 text-ink"
                  : "text-muted hover:bg-white/5 hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
          <MagneticButton href="#contact" onClick={closeMobileMenu}>
            Start a Conversation
          </MagneticButton>
        </nav>
      </div>
    </header>
  );
}
