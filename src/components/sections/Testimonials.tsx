"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const rest = [
  { x: -300, y: 48, rotate: -2, zIndex: 1 },
  { x: 0, y: 0, rotate: 1.2, zIndex: 3 },
  { x: 300, y: 32, rotate: -0.8, zIndex: 2 },
];

const thrown = [
  { x: -520, y: 320, rotate: -28, scale: 0.82 },
  { x: 480, y: 360, rotate: 24, scale: 0.82 },
  { x: -360, y: 300, rotate: -22, scale: 0.82 },
];

function TestimonialCard({
  t,
  className,
  cardRef,
}: {
  t: (typeof testimonials)[number];
  className?: string;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={cn(
        "w-full max-w-sm rounded-2xl border border-ice/5 bg-surface/90 p-8",
        "shadow-[0_24px_80px_rgb(0_0_0/0.35)] backdrop-blur-sm will-change-transform md:absolute md:w-80",
        "motion-safe:opacity-0",
        className,
      )}
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
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !stage || cards.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      if (reduced) {
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, {
          xPercent: -50,
          left: "50%",
          top: "50%",
          yPercent: -50,
          opacity: 0,
          scale: 0.88,
          transformOrigin: "50% 80%",
        });

        cards.forEach((card, i) => {
          gsap.set(card, { zIndex: rest[i].zIndex });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (cards.length + 0.5)}`,
            pin: true,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          const segment = 1;
          const start = i * segment;

          tl.fromTo(
            card,
            {
              x: thrown[i].x,
              y: thrown[i].y,
              rotate: thrown[i].rotate,
              scale: thrown[i].scale,
              opacity: 0,
            },
            {
              x: rest[i].x,
              y: rest[i].y,
              rotate: rest[i].rotate,
              scale: 1,
              opacity: 1,
              ease: "back.out(1.35)",
              duration: segment,
            },
            start,
          );

          if (i > 0) {
            for (let j = 0; j < i; j++) {
              tl.to(
                cards[j],
                {
                  scale: 0.94 - j * 0.02,
                  y: rest[j].y + 12 + j * 4,
                  opacity: 0.72 - j * 0.08,
                  duration: segment * 0.6,
                  ease: "power2.out",
                },
                start,
              );
            }
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cards, { clearProps: "left,top,xPercent,yPercent,zIndex" });

        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              x: i % 2 === 0 ? -72 : 72,
              y: 120,
              rotate: i % 2 === 0 ? -14 : 14,
              opacity: 0,
              scale: 0.9,
              transformOrigin: "50% 80%",
            },
            {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 52%",
                scrub: 0.6,
              },
            },
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="label-premium">Clientes</p>
          <h2 className="heading-display mt-3">Confiança construída</h2>
        </Reveal>

        <div
          ref={stageRef}
          className="relative mt-20 flex min-h-[420px] flex-col items-center gap-6 md:mt-24 md:block md:min-h-[480px]"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              t={t}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
