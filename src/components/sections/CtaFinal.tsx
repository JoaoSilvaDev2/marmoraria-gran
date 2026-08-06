"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CtaFinal() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      <Image src="/images/marmore (1).jpeg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-graphite/75" />
      <div className="noise-overlay absolute inset-0" />

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
