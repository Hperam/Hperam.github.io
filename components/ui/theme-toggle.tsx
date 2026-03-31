"use client";

import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-switch relative inline-flex h-11 w-[84px] items-center rounded-full border border-white/10 bg-white/5 p-1 text-muted shadow-panel backdrop-blur-xl transition hover:border-brand/40 active:scale-[0.98]"
      aria-label="Toggle theme"
    >
      <span
        className="theme-switch-thumb absolute top-1 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-white/95 to-white/80 text-slate-950 shadow-[0_12px_32px_rgba(15,23,42,0.22)] transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ left: theme === "dark" ? 4 : 40 }}
      >
        {theme === "dark" ? <Moon size={16} /> : <SunMedium size={16} />}
      </span>
      <span className="flex w-full items-center justify-between px-3">
        <Moon size={14} className="text-white/80" />
        <SunMedium size={14} className="text-amber-300" />
      </span>
    </button>
  );
}
