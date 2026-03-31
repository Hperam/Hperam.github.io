"use client";

import clsx from "clsx";
import { Github, Linkedin, Mail } from "lucide-react";

import { portfolio } from "@/data/portfolio";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail
} as const;

type SocialLinksProps = {
  labels?: Array<keyof typeof iconMap>;
  className?: string;
  itemClassName?: string;
};

export function SocialLinks({
  labels = ["GitHub", "LinkedIn", "Email"],
  className,
  itemClassName
}: SocialLinksProps) {
  const items = portfolio.socials.filter((item): item is (typeof portfolio.socials)[number] & {
    label: keyof typeof iconMap;
  } => labels.includes(item.label as keyof typeof iconMap));

  return (
    <div className={clsx("flex flex-wrap items-center gap-3", className)}>
      {items.map((item) => {
        const Icon = iconMap[item.label];
        const isExternal = item.href.startsWith("http");

        return (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className={clsx(
              "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:border-brand/40 hover:bg-brand/10 hover:text-ink",
              itemClassName
            )}
          >
            <Icon size={18} strokeWidth={1.9} />
          </a>
        );
      })}
    </div>
  );
}
