"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Projects() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section id="projetos" className="section-pad">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <p className="label-premium">Portfólio</p>
            <h2 className="heading-display mt-3">Projetos realizados</h2>
          </Reveal>

          <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <button
                  type="button"
                  onClick={() => setLightbox(p.image)}
                  className="group relative mb-5 block w-full overflow-hidden rounded-2xl border border-ice/5 text-left break-inside-avoid"
                  data-cursor="zoom"
                >
                  <div className="relative w-full aspect-[4/5]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "saturate(0.92) contrast(1.02)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:-translate-y-1">
                      <h3 className="text-lg font-medium text-ice">{p.title}</h3>
                      <p className="text-xs text-concrete">{p.material}</p>
                      <p className="text-xs text-stone-600">{p.location}</p>
                      <span className="mt-3 inline-flex text-xs font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
                        Ver projeto →
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite/95 p-6 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-h-[90vh] max-w-6xl flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox} alt="" width={1400} height={900} className="h-auto max-h-[90vh] w-full rounded-xl object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
