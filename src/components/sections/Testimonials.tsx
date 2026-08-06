"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const offsets = [
  { y: 0, rotate: -1 },
  { y: 24, rotate: 1.5 },
  { y: -16, rotate: -0.5 },
];

export default function Testimonials() {
  return (
    <section className="section-pad overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Clientes</p>
          <h2 className="heading-display mt-3">Confiança construída</h2>
        </Reveal>

        <div className="relative mt-20 flex min-h-[420px] flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: offsets[i].y + 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: offsets[i].y - 8, rotate: 0 }}
              style={{ rotate: offsets[i].rotate, zIndex: i === 1 ? 10 : 5 - i }}
              className="w-full max-w-sm rounded-2xl border border-ice/5 bg-surface/90 p-8 shadow-[0_24px_80px_rgb(0_0_0/0.35)] backdrop-blur-sm md:absolute md:w-80"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-xs font-semibold text-gold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-ice">{t.name}</p>
                  <p className="text-xs text-concrete">{t.role}</p>
                </div>
              </div>
              <p className="mt-2 text-xs tracking-widest text-gold">★★★★★</p>
              <p className="mt-4 text-sm leading-relaxed text-concrete">&ldquo;{t.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
