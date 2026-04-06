"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { portfolio } from "@/data/portfolio";
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
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.07] bg-panel/80 backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">

        {/* Logo — text mark only */}
        <a
          href="#hero"
          className="text-[0.95rem] font-semibold tracking-[-0.03em] text-ink transition-colors duration-200 hover:text-brand"
        >
          {portfolio.name.split(" ").slice(0, 2).join(" ")}
          <span className="text-brand">.</span>
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "relative text-[13px] font-medium transition-colors duration-200",
                active === item.id
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              )}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-brand" />
              )}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-[13px] font-medium text-brand transition-colors duration-200 hover:bg-brand/20 md:block"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-white/8 hover:text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "overflow-hidden border-white/[0.07] bg-panel/95 backdrop-blur-2xl transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto max-h-[400px] border-b opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <nav className="grid gap-1 px-6 py-4">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active === item.id
                  ? "text-brand"
                  : "text-muted hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-center text-sm font-medium text-brand"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
