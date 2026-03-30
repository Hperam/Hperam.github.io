"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

export function TiltCard({ children, className, ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

    node.style.setProperty("--glare-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty("--glare-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    node.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    ref.current.style.setProperty("--glare-x", "50%");
    ref.current.style.setProperty("--glare-y", "50%");
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ y: -4, scale: 1.01 }}
      className={clsx(
        "tilt-card relative overflow-hidden transition-transform duration-300 will-change-transform",
        className
      )}
      {...rest}
    >
      <span className="tilt-card-glare" />
      {children}
    </motion.div>
  );
}
