"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import {
  catalogStones,
  preloadStoneImage,
  stoneThemeClasses,
  type CatalogStone,
} from "@/lib/stones-catalog";
import { cn } from "@/lib/utils";

const DURATION = 0.95;
const EASE = "power3.inOut";

const initialOrder = catalogStones.map((s) => s.id);

function stoneById(id: string) {
  return catalogStones.find((s) => s.id === id)!;
}

export default function StoneExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const baseLayerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const [displayOrder, setDisplayOrder] = useState<string[]>(initialOrder);
  const [activeId, setActiveId] = useState(catalogStones[0].id);
  const [displayStone, setDisplayStone] = useState(catalogStones[0]);
  const [contentKey, setContentKey] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const transitioningRef = useRef(false);
  const preloadedRef = useRef<Set<string>>(new Set([catalogStones[0].image]));
  const thumbRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const theme = stoneThemeClasses(displayStone.theme);

  const preload = useCallback(async (src: string) => {
    if (preloadedRef.current.has(src)) return;
    await preloadStoneImage(src);
    preloadedRef.current.add(src);
  }, []);

  useEffect(() => {
    preload(catalogStones[0].image);
    catalogStones.slice(1, 3).forEach((s) => preload(s.image));
  }, [preload]);

  const getRevealOrigin = (stoneId: string) => {
    const section = sectionRef.current;
    const thumb = thumbRefs.current[stoneId];
    if (!section || !thumb) {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
    const sRect = section.getBoundingClientRect();
    const tRect = thumb.getBoundingClientRect();
    return {
      x: tRect.left + tRect.width / 2 - sRect.left,
      y: tRect.top + tRect.height / 2 - sRect.top,
    };
  };

  const moveToFront = (stoneId: string) => {
    setDisplayOrder((prev) => [stoneId, ...prev.filter((id) => id !== stoneId)]);
  };

  const selectStone = async (stoneId: string, reducedMotion: boolean) => {
    if (stoneId === activeId || transitioningRef.current) return;

    const nextStone = stoneById(stoneId);
    transitioningRef.current = true;

    try {
      await preload(nextStone.image);
    } catch {
      transitioningRef.current = false;
      return;
    }

    if (reducedMotion) {
      setActiveId(stoneId);
      setDisplayStone(nextStone);
      setContentKey((k) => k + 1);
      moveToFront(stoneId);
      if (baseLayerRef.current) {
        baseLayerRef.current.style.backgroundImage = `url("${nextStone.image}")`;
      }
      transitioningRef.current = false;
      return;
    }

    const revealEl = revealLayerRef.current;
    const baseEl = baseLayerRef.current;
    const section = sectionRef.current;
    if (!revealEl || !baseEl || !section) {
      transitioningRef.current = false;
      return;
    }

    const { x, y } = getRevealOrigin(stoneId);
    revealEl.style.backgroundImage = `url("${nextStone.image}")`;
    revealEl.style.opacity = "1";

    setContentVisible(false);
    setDisplayStone(nextStone);

    const maxRadius = Math.hypot(section.offsetWidth, section.offsetHeight) * 1.15;

    gsap.killTweensOf(revealEl);
    gsap.set(revealEl, {
      clipPath: `circle(0px at ${x}px ${y}px)`,
      scale: 1.03,
      transformOrigin: `${x}px ${y}px`,
    });

    await new Promise<void>((resolve) => {
      gsap.to(revealEl, {
        clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        scale: 1,
        duration: DURATION,
        ease: EASE,
        onComplete: resolve,
      });
    });

    baseEl.style.backgroundImage = `url("${nextStone.image}")`;
    gsap.set(revealEl, { clipPath: "circle(0px at 50% 50%)", scale: 1, opacity: 0 });

    setActiveId(stoneId);
    moveToFront(stoneId);
    setContentKey((k) => k + 1);
    setContentVisible(true);
    transitioningRef.current = false;
  };

  const handleSelect = (stoneId: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    selectStone(stoneId, reduced);
  };

  return (
    <section
      id="materiais"
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[640px] overflow-hidden bg-graphite"
      aria-label="Catálogo de pedras"
    >
      <div
        ref={baseLayerRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url("${catalogStones[0].image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label={`Textura ${displayStone.name}`}
      />

      <div
        ref={revealLayerRef}
        className="pointer-events-none absolute inset-0 z-[1] bg-cover bg-center opacity-0 will-change-[clip-path,transform]"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2] transition-[background] duration-700 ease-out"
        style={{ background: displayStone.overlay }}
      />

      <AnimatePresence mode="wait">
        <motion.span
          key={`idx-${displayStone.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-none absolute right-6 top-24 z-[3] select-none font-semibold tracking-tighter md:right-12 md:top-28",
            "text-[clamp(5rem,18vw,14rem)] leading-none",
            theme.indexBg,
          )}
        >
          {displayStone.index}
        </motion.span>
      </AnimatePresence>

      <div className="relative z-[4] flex h-full flex-col justify-between px-6 pb-36 pt-28 md:px-12 md:pb-40 md:pt-32 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 12 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className={cn("label-premium mb-4", theme.label)}>
              {displayStone.index} — {displayStone.name}
            </p>
            <h2 className={cn("text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem]", theme.title)}>
              {displayStone.headline}
            </h2>
            <p className={cn("mt-5 max-w-md text-sm leading-relaxed md:text-base", theme.body)}>
              {displayStone.legend}
            </p>
            <p className={cn("mt-2 text-xs tracking-wide", theme.body, "opacity-70")}>
              {displayStone.category}
            </p>
            <Link
              href="#projetos"
              className={cn(
                "group mt-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors md:text-sm",
                theme.title,
              )}
            >
              <span className="h-px w-8 bg-gold transition-all group-hover:w-12" />
              Conheça nossos projetos
            </Link>
          </motion.div>
        </AnimatePresence>

        <StoneSelector
          displayOrder={displayOrder}
          activeId={activeId}
          displayTheme={displayStone.theme}
          thumbRefs={thumbRefs}
          onSelect={handleSelect}
          onHoverPreload={preload}
        />
      </div>
    </section>
  );
}

function StoneSelector({
  displayOrder,
  activeId,
  displayTheme,
  thumbRefs,
  onSelect,
  onHoverPreload,
}: {
  displayOrder: string[];
  activeId: string;
  displayTheme: CatalogStone["theme"];
  thumbRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
  onSelect: (id: string) => void;
  onHoverPreload: (src: string) => void;
}) {
  const theme = stoneThemeClasses(displayTheme);

  return (
    <div className="relative -mx-6 md:-mx-12 lg:-mx-16">
      <div className="border-t border-ice/10 px-6 pt-6 md:px-12 md:pt-7 lg:px-16" />
      <div
        className="flex items-end gap-5 overflow-x-auto px-6 pb-4 md:gap-6 md:overflow-visible md:px-12 md:pb-5 lg:gap-8 lg:px-16 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {displayOrder.map((stoneId) => {
          const stone = stoneById(stoneId);
          const isActive = stoneId === activeId;
          return (
            <motion.button
              key={stone.id}
              layout
              layoutId={`stone-selector-${stone.id}`}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              ref={(el) => {
                thumbRefs.current[stone.id] = el;
              }}
              type="button"
              onClick={() => onSelect(stone.id)}
              onMouseEnter={() => onHoverPreload(stone.image)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Selecionar ${stone.name}`}
              className={cn(
                "group flex flex-shrink-0 flex-col items-center gap-2.5 py-2 snap-center",
                "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                !isActive && "opacity-70 hover:opacity-100",
              )}
            >
              {/* Amostra circular */}
              <span
                className={cn(
                  "relative block shrink-0 overflow-hidden rounded-full transition-all duration-500",
                  isActive
                    ? "h-[4.25rem] w-[4.25rem] ring-2 ring-gold ring-offset-2 ring-offset-transparent md:h-[4.75rem] md:w-[4.75rem]"
                    : "h-14 w-14 ring-1 ring-black/15 group-hover:ring-gold/40 md:h-16 md:w-16",
                )}
              >
                <span
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${stone.image}")` }}
                />
              </span>

              <span className="flex max-w-[5.5rem] flex-col items-center gap-0.5 text-center">
                <span
                  className={cn(
                    "text-[0.6875rem] tabular-nums tracking-wider md:text-xs",
                    isActive ? "font-medium text-gold" : theme.selectorText,
                  )}
                >
                  {stone.index}
                </span>
                <span
                  className={cn(
                    "text-[0.6875rem] font-medium leading-tight tracking-wide md:text-xs",
                    isActive ? cn(theme.selectorActive, "font-semibold") : theme.selectorText,
                  )}
                >
                  {stone.shortName}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
