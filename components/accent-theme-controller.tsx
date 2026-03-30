"use client";

import { useEffect } from "react";

type PaletteFamily = {
  dark: {
    brand: string;
    accent: string;
  };
  light: {
    brand: string;
    accent: string;
  };
};

const paletteFamilies: PaletteFamily[] = [
  {
    dark: { brand: "255 120 72", accent: "255 78 205" },
    light: { brand: "234 88 12", accent: "190 24 93" }
  },
  {
    dark: { brand: "255 184 77", accent: "255 106 122" },
    light: { brand: "217 119 6", accent: "225 29 72" }
  },
  {
    dark: { brand: "110 96 255", accent: "255 110 163" },
    light: { brand: "79 70 229", accent: "219 39 119" }
  },
  {
    dark: { brand: "83 143 255", accent: "176 92 255" },
    light: { brand: "37 99 235", accent: "124 58 237" }
  },
  {
    dark: { brand: "255 99 132", accent: "255 170 76" },
    light: { brand: "225 29 72", accent: "217 119 6" }
  }
];

function applyPalette(paletteFamily: PaletteFamily) {
  const root = document.documentElement;
  const theme = root.dataset.theme === "light" ? "light" : "dark";
  const palette = paletteFamily[theme];

  root.style.setProperty("--brand", palette.brand);
  root.style.setProperty("--accent", palette.accent);
}

export function AccentThemeController() {
  useEffect(() => {
    const paletteFamily =
      paletteFamilies[Math.floor(Math.random() * paletteFamilies.length)];

    applyPalette(paletteFamily);

    const observer = new MutationObserver(() => {
      applyPalette(paletteFamily);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
