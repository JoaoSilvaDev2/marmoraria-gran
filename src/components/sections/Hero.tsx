"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const bgX = useTransform(sx, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(sy, [-0.5, 0.5], ["-2%", "2%"]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY, scale: 1.08 }}>
        <Image
          src="/images/fundo-hero.png"
          alt="Macro de mármore com veios naturais"
          fill
          priority
          className="object-cover object-center"
          data-cursor="zoom"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/20" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <motion.div
        className="pointer-events-none absolute h-[40vmin] w-[40vmin] rounded-full bg-gold/10 blur-[100px]"
        style={{ left: glowX, top: glowY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Partículas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-px w-px rounded-full bg-ice/40"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 md:pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-10"
        >
          <Image src="/images/logo-dourada.png" alt="" width={100} height={28} className="h-6 w-auto opacity-90 md:h-7" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display max-w-4xl text-balance"
        >
          Engenharia em pedra.
          <br />
          <span className="text-concrete">Acabamento impecável.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-lg text-sm leading-relaxed text-concrete md:text-base"
        >
          Da medição à instalação — mármore, granito e quartzo para quem exige precisão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton href="#contato">Solicitar orçamento gratuito</MagneticButton>
          <MagneticButton href="#projetos" variant="outline" className="px-8 py-4">
            Ver projetos
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex flex-wrap gap-6 border-t border-ice/10 pt-8 text-xs text-concrete md:text-sm"
        >
          {["Orçamento gratuito", "Visita técnica", "Todo o Rio de Janeiro"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.625rem] uppercase tracking-[0.2em] text-concrete"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
          Scroll
        </motion.span>
        <span className="h-8 w-px bg-ice/20" />
      </motion.div>
    </section>
  );
}
