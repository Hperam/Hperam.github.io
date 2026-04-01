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
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.6], rootMargin: "-25% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const closeOnResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <div
        className={clsx(
          "mx-auto flex max-w-[1240px] items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300",
          scrolled
            ? "border border-white/10 bg-panel/85 shadow-panel backdrop-blur-2xl"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/20 text-[11px] font-bold text-brand ring-1 ring-brand/30 transition group-hover:bg-brand/30">
            HP
          </span>
          <span className="hidden text-[0.9rem] font-semibold tracking-[-0.03em] text-ink transition group-hover:text-brand sm:block">
            {portfolio.name.split(" ")[0]}
            <span className="font-normal text-muted"> {portfolio.name.split(" ").slice(1).join(" ")}</span>
          </span>
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-0.5 rounded-full border border-white/8 bg-white/[0.04] px-1.5 py-1.5 backdrop-blur-sm lg:flex">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200",
                active === item.id
                  ? "bg-brand/15 text-brand shadow-[0_0_12px_rgb(var(--brand)/0.2)]"
                  : "text-muted hover:bg-white/6 hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/8 hover:text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "rounded-xl px-4 py-2.5 text-sm font-medium transition",
                active === item.id
                  ? "bg-brand/12 text-brand"
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
