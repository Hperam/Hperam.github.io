"use client";

import { useEffect } from "react";

type PaletteFamily = {
  dark: { brand: string; accent: string };
  light: { brand: string; accent: string };
};

const paletteFamilies: PaletteFamily[] = [
  // Orange / Pink
  { dark: { brand: "255 120 72", accent: "255 78 205" }, light: { brand: "234 88 12", accent: "190 24 93" } },
  // Gold / Red
  { dark: { brand: "255 184 77", accent: "255 106 122" }, light: { brand: "217 119 6", accent: "225 29 72" } },
  // Indigo / Pink
  { dark: { brand: "110 96 255", accent: "255 110 163" }, light: { brand: "79 70 229", accent: "219 39 119" } },
  // Blue / Purple
  { dark: { brand: "83 143 255", accent: "176 92 255" }, light: { brand: "37 99 235", accent: "124 58 237" } },
  // Rose / Amber
  { dark: { brand: "255 99 132", accent: "255 170 76" }, light: { brand: "225 29 72", accent: "217 119 6" } },
  // Emerald / Cyan
  { dark: { brand: "52 211 153", accent: "34 211 238" }, light: { brand: "16 185 129", accent: "6 182 212" } },
  // Teal / Rose
  { dark: { brand: "45 212 191", accent: "251 113 133" }, light: { brand: "20 184 166", accent: "244 63 94" } },
  // Violet / Orange
  { dark: { brand: "167 139 250", accent: "251 146 60" }, light: { brand: "139 92 246", accent: "234 88 12" } },
  // Cyan / Violet
  { dark: { brand: "34 211 238", accent: "167 139 250" }, light: { brand: "6 182 212", accent: "139 92 246" } },
  // Lime / Pink
  { dark: { brand: "163 230 53", accent: "244 114 182" }, light: { brand: "101 163 13", accent: "236 72 153" } },
  // Fuchsia / Teal
  { dark: { brand: "232 121 249", accent: "45 212 191" }, light: { brand: "192 38 211", accent: "20 184 166" } },
  // Sky / Amber
  { dark: { brand: "56 189 248", accent: "251 191 36" }, light: { brand: "14 165 233", accent: "245 158 11" } },
  // Red / Indigo
  { dark: { brand: "248 113 113", accent: "129 140 248" }, light: { brand: "239 68 68", accent: "99 102 241" } },
  // Amber / Emerald
  { dark: { brand: "251 191 36", accent: "52 211 153" }, light: { brand: "245 158 11", accent: "16 185 129" } },
  // Pink / Sky
  { dark: { brand: "244 114 182", accent: "56 189 248" }, light: { brand: "236 72 153", accent: "14 165 233" } },
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
