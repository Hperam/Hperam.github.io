"use client";

import clsx from "clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isExternal =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const bounds = node.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    node.style.transform = `translate(${offsetX * 0.12}px, ${offsetY * 0.12}px)`;
  };

  const reset = () => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={isExternal ? "_blank" : rest.target}
      rel={isExternal ? "noreferrer" : rest.rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={clsx(
        "group inline-flex min-h-[48px] items-center justify-center rounded-full px-5 py-3 text-sm font-medium tracking-[-0.02em] transition duration-300 will-change-transform",
        variant === "primary" &&
          "border border-white/20 bg-brand/90 text-white shadow-glow hover:bg-brand",
        variant === "secondary" &&
          "border border-white/10 bg-white/5 text-white hover:border-brand/50 hover:bg-brand/10",
        variant === "ghost" &&
          "border border-white/10 bg-transparent text-muted hover:border-white/20 hover:text-white",
        className
      )}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}
