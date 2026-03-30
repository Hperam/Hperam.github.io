import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

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
    "Software engineer building scalable, beautiful, intelligent products across distributed systems, AI, cloud, and full-stack engineering.",
  metadataBase: new URL("https://hperam.github.io"),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Harshith Sai Peram | Software Engineer",
    description:
      "Recruiter-focused portfolio for a software engineer working across AI, product engineering, and high-scale systems.",
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
        {children}
      </body>
    </html>
  );
}
