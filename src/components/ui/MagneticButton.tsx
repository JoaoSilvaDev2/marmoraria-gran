"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "outline";
  type?: "button" | "submit";
  target?: string;
  rel?: string;
};

export default function MagneticButton({
  href,
  onClick,
  children,
  className,
  variant = "gold",
  type = "button",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    variant === "gold"
      ? "relative overflow-hidden bg-gold text-graphite shadow-[0_4px_24px_rgb(176_141_87/0.25)] hover:shadow-[0_8px_40px_rgb(176_141_87/0.35)]"
      : "border border-ice/20 text-ice hover:border-gold/40 hover:bg-gold/5";

  const inner = (
    <>
      {variant === "gold" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shine_5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-shadow duration-500 md:text-base",
    base,
    className,
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={classes}
        whileTap={{ scale: 0.98 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={classes}
      whileTap={{ scale: 0.98 }}
    >
      {inner}
    </motion.button>
  );
}
