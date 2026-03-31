import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { AccentThemeController } from "@/components/accent-theme-controller";

import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Harshith Sai Peram | Software Engineer",
  description:
    "Software engineer focused on backend systems, full-stack delivery, AI product engineering, and cloud-native platforms.",
  metadataBase: new URL("https://hperam.github.io"),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Harshith Sai Peram | Software Engineer",
    description:
      "Portfolio for a software engineer focused on backend systems, full-stack delivery, AI product engineering, and high-scale platforms.",
    type: "website",
    url: "https://hperam.github.io",
    images: [
      {
        url: "/og-preview.svg",
        width: 1200,
        height: 630,
        alt: "Harshith Sai Peram portfolio preview"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <body className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
        <AccentThemeController />
        {children}
      </body>
    </html>
  );
}
