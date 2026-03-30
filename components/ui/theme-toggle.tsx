"use client";

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
      className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/5 px-4 text-xs font-medium uppercase tracking-[0.22em] text-muted transition hover:border-brand/40 hover:text-ink"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
