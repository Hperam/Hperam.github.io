import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(122, 162, 255, 0.25), 0 20px 70px rgba(35, 65, 255, 0.2)",
        panel:
          "0 24px 80px rgba(2, 6, 23, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
      },
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(circle at top, rgba(122, 162, 255, 0.24), transparent 28%), radial-gradient(circle at 20% 20%, rgba(47, 125, 244, 0.14), transparent 22%), radial-gradient(circle at 80% 10%, rgba(145, 82, 255, 0.16), transparent 20%)"
      }
    }
  },
  darkMode: ["class", '[data-theme="dark"]']
};

export default config;
