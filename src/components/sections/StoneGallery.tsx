"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { stones } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function StoneGallery() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Catálogo</p>
          <h2 className="heading-display mt-3">Texturas naturais</h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stones.map((stone, i) => (
            <StoneCard key={stone.id} stone={stone} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoneCard({ stone, index }: { stone: (typeof stones)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  return (
    <Reveal delay={index * 0.08}>
      <TiltCard>
        <div
          ref={ref}
          onMouseMove={(e) => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            setSpot({
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100,
            });
          }}
          className="group relative overflow-hidden rounded-2xl border border-ice/5 bg-surface transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_60px_rgb(0_0_0/0.4)]"
          data-cursor="zoom"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{
                background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgb(255 255 255 / 0.12), transparent 50%)`,
              }}
            />
            <Image src={stone.image} alt={stone.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent opacity-80" />
          </div>
          <div className="glass absolute bottom-0 left-4 right-4 mb-4 rounded-xl p-5 transition-transform duration-500 group-hover:-translate-y-1">
            <p className="label-premium">{stone.category}</p>
            <h3 className="mt-1 text-lg font-medium text-ice">{stone.name}</h3>
            <p className="mt-1 text-xs text-concrete">{stone.origin}</p>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}
