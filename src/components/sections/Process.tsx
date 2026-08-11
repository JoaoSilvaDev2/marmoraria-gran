"use client";

import { processSteps } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Process() {
  return (
    <section id="processo" className="section-pad overflow-hidden bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Metodologia</p>
          <h2 className="heading-display mt-3">Nosso processo</h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between rounded-2xl border border-ice/5 bg-surface/80 p-8"
            >
              <span className="text-5xl font-light text-gold/30">{step.step}</span>
              <div className="mt-auto pt-12">
                <h3 className="text-xl font-medium text-ice">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-concrete">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
