"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { catalogProducts, type MaterialCategory } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const filters: { id: MaterialCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "marmore", label: "Mármore" },
  { id: "granito", label: "Granito" },
  { id: "quartzo", label: "Quartzo" },
];

const categoryLabels: Record<MaterialCategory, string> = {
  marmore: "Mármore",
  granito: "Granito",
  quartzo: "Quartzo",
};

export default function MaterialsCatalog() {
  const [filter, setFilter] = useState<MaterialCategory | "todos">("todos");

  const visible =
    filter === "todos" ? catalogProducts : catalogProducts.filter((p) => p.category === filter);

  return (
    <section id="catalogo" className="section-pad bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label-premium">Catálogo</p>
            <h2 className="heading-display mt-3">Materiais que trabalhamos</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-concrete">
              Pedras naturais e superfícies premium selecionadas. Se não encontrar o que procura, nossa equipe orienta na escolha ideal.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-md border px-4 py-2 text-xs font-medium transition-colors",
                    filter === f.id
                      ? "border-gold/40 bg-gold/10 text-ice"
                      : "border-ice/10 text-concrete hover:border-ice/20 hover:text-ice",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-2xl border border-ice/5 bg-surface/80 transition-colors hover:border-gold/25"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-gold">
                    {categoryLabels[product.category]}
                  </span>
                  <h3 className="mt-2 text-sm font-medium text-ice">{product.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-concrete">{product.description}</p>
                  <p className="mt-2 text-xs text-stone-600">{product.origin}</p>
                  <Link
                    href="#contato"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-gold transition-colors hover:text-ice"
                  >
                    Solicitar orçamento gratuito
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
