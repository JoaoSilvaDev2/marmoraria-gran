"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const onMove = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="section-pad bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Transformação</p>
          <h2 className="heading-display mt-3">Antes & Depois</h2>
          <p className="mt-4 max-w-md text-sm text-concrete">Arraste para comparar o ambiente antes e depois da instalação.</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            ref={containerRef}
            className="relative mt-14 aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-2xl border border-ice/5"
            onMouseMove={(e) => onMove(e.clientX)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            data-cursor="zoom"
          >
            <Image src="/images/depois.jpeg" alt="Depois" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image src="/images/antes.jpeg" alt="Antes" fill className="object-cover grayscale" sizes="100vw" />
            </div>
            <div
              className="absolute top-0 bottom-0 z-10 w-px bg-gold shadow-[0_0_20px_rgb(176_141_87/0.6)]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-graphite/90 text-xs text-gold">
                ↔
              </div>
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-graphite/80 px-3 py-1 text-xs text-concrete">Antes</span>
            <span className="absolute right-4 top-4 rounded-full bg-graphite/80 px-3 py-1 text-xs text-ice">Depois</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
