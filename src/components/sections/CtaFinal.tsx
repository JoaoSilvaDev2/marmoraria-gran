"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";

const SLIDES = projects.map((p) => ({ src: p.image, alt: p.title }));
const INTERVAL_MS = 5500;
const FADE_MS = 1200;

export default function CtaFinal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || SLIDES.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-graphite">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/80 to-graphite/55" />
      <div className="noise-overlay absolute inset-0" />

      {/* Indicador discreto */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Projeto ${i + 1}`}
            onClick={() => setIndex(i)}
            className="group p-1"
          >
            <span
              className={`block h-px transition-all duration-500 ${
                i === index ? "w-8 bg-gold" : "w-4 bg-ice/25 group-hover:bg-ice/50"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display text-balance"
        >
          Vamos transformar seu projeto em realidade?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mx-auto mt-6 max-w-md text-sm text-concrete md:text-base"
        >
          Orçamento gratuito. Visita técnica. Resposta em até 24 horas.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-12"
        >
          <MagneticButton href="#contato" className="px-12 py-5 text-base md:text-lg gold-glow hover:gold-glow">
            Solicitar orçamento gratuito
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
