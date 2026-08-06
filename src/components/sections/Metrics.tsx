"use client";

import { useEffect, useRef, useState } from "react";
import { metrics } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

function CountUp({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 1800;

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = value * eased;
          setDisplay(decimals ? parseFloat(v.toFixed(decimals)) : Math.floor(v));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals]);

  return (
    <span ref={ref}>
      {decimals ? display.toFixed(decimals) : display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="section-pad border-y border-ice/5 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-4xl font-semibold tracking-tight text-ice md:text-5xl lg:text-6xl">
                  <CountUp value={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-3 text-sm text-concrete">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
