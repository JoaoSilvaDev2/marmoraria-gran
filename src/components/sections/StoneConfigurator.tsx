"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { stones } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function StoneConfigurator() {
  const [active, setActive] = useState(stones[0]);

  return (
    <section id="configurador" className="section-pad relative overflow-hidden bg-surface">
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Experiência</p>
          <h2 className="heading-display mt-3 max-w-2xl text-balance">Escolha sua pedra</h2>
          <p className="mt-4 max-w-md text-sm text-concrete">
            Visualize o material em ambiente real. Selecione a chapa e veja a transformação instantânea.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-2">
              {stones.map((stone) => (
                <button
                  key={stone.id}
                  type="button"
                  onClick={() => setActive(stone)}
                  className={`group flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-500 ${
                    active.id === stone.id
                      ? "border-gold/40 bg-gold/5 shadow-[0_0_40px_rgb(176_141_87/0.08)]"
                      : "border-ice/5 bg-surface/50 hover:border-ice/10"
                  }`}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={stone.image} alt="" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ice">{stone.name}</p>
                    <p className="text-xs text-concrete">{stone.category} · {stone.origin}</p>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ice/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.previewScene}
                    alt={active.name}
                    fill
                    className="object-cover"
                    data-cursor="zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="label-premium">{active.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-ice md:text-3xl">{active.name}</h3>
                    <p className="mt-2 max-w-sm text-sm text-concrete">{active.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6">
              <MagneticButton href="#contato" className="w-full sm:w-auto">
                Solicitar orçamento gratuito
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
