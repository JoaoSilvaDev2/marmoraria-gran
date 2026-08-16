"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { differentials } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const animations = [
  { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 } },
  { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: -30 }, whileInView: { opacity: 1, y: 0 } },
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="section-pad">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Diferenciais</p>
          <h2 className="heading-display mt-3">Por que Granorte</h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {differentials.map((d, i) => (
            <DiffCard key={d.title} item={d} anim={animations[i % animations.length]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiffCard({
  item,
  anim,
  index,
}: {
  item: (typeof differentials)[0];
  anim: (typeof animations)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={anim.initial}
      whileInView={anim.whileInView}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }}
      className="group relative overflow-hidden rounded-2xl border border-ice/5 bg-surface/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25 hover:shadow-[0_16px_48px_rgb(0_0_0/0.35)]"
      style={{
        background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgb(176 141 87 / 0.06), transparent 60%), rgb(37 37 37 / 0.6)",
      }}
    >
      <h3 className="text-sm font-medium text-ice transition-transform duration-300 group-hover:translate-x-0.5">{item.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-concrete">{item.text}</p>
    </motion.div>
  );
}
