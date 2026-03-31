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
    <header className="sticky top-0 z-50 px-4 pt-3">
      <div
        className={clsx(
          "mx-auto flex max-w-[1240px] items-center justify-between rounded-full px-5 py-2.5 transition duration-300",
          scrolled
            ? "border border-white/10 bg-panel/85 shadow-panel backdrop-blur-2xl"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo — just the name */}
        <a
          href="#hero"
          className="text-[0.95rem] font-semibold tracking-[-0.03em] text-ink transition hover:text-brand"
        >
          {portfolio.name.split(" ")[0]}
          <span className="text-muted font-normal"> {portfolio.name.split(" ").slice(1).join(" ")}</span>
        </a>

        {/* Center nav links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "rounded-full px-3.5 py-1.5 text-[13px] transition",
                active === item.id
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              )}
            >
              {item.label}
              {active === item.id && (
                <span className="mx-auto mt-0.5 block h-px w-3 rounded-full bg-brand" />
              )}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-ink lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <MagneticButton href="#contact" className="hidden text-[13px] !min-h-[36px] !px-4 !py-1.5 md:inline-flex">
            Get in touch
          </MagneticButton>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-[24px] border bg-panel/95 shadow-panel backdrop-blur-2xl transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto max-h-[400px] border-white/10 opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        )}
      >
        <nav className="grid gap-1 p-3">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMobileMenu}
              className={clsx(
                "rounded-xl px-4 py-2.5 text-sm transition",
                active === item.id
                  ? "bg-white/10 text-ink"
                  : "text-muted hover:bg-white/5 hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
