"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 120),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="processo" ref={sectionRef} className="section-pad overflow-hidden bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Metodologia</p>
          <h2 className="heading-display mt-3">Nosso processo</h2>
        </Reveal>
      </div>

      <div ref={trackRef} className="mt-16 flex gap-8 px-6 lg:mt-20 lg:gap-12 lg:px-8">
        {processSteps.map((step, i) => (
          <div
            key={step.step}
            className="flex min-w-[280px] flex-col justify-between rounded-2xl border border-ice/5 bg-surface/80 p-8 md:min-w-[320px] lg:min-w-[360px]"
          >
            <span className="text-5xl font-light text-gold/30">{step.step}</span>
            <div className="mt-auto pt-12">
              <h3 className="text-xl font-medium text-ice">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-concrete">{step.text}</p>
              {i < processSteps.length - 1 && (
                <span className="mt-6 block text-gold/50">↓</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
