"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  categoryById,
  materialCategories,
  preloadMaterialImage,
  type CatalogStone,
  type MaterialCategory,
} from "@/lib/materials-catalog";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;
const CONTENT_TRANSITION_MS = 550;

export default function MaterialsCatalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<MaterialCategory>("marmore");
  const [activeStoneId, setActiveStoneId] = useState(materialCategories[0].stones[0].id);
  const [hoverStoneId, setHoverStoneId] = useState<string | null>(null);
  const [stoneLocked, setStoneLocked] = useState(false);
  const preloadedRef = useRef<Set<string>>(new Set());

  const category = categoryById(activeCategory);
  const activeStone = category.stones.find((s) => s.id === activeStoneId) ?? category.stones[0];
  const previewStone =
    hoverStoneId != null
      ? category.stones.find((s) => s.id === hoverStoneId) ?? activeStone
      : activeStone;
  const stoneIndex = category.stones.findIndex((s) => s.id === activeStone.id) + 1;

  const preload = useCallback(async (src: string) => {
    if (preloadedRef.current.has(src)) return;
    try {
      await preloadMaterialImage(src);
      preloadedRef.current.add(src);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    preload(materialCategories[0].stones[0].image);
    materialCategories[0].stones.slice(1, 3).forEach((s) => preload(s.image));
  }, [preload]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(content.querySelectorAll("[data-catalog-reveal]"), {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const selectCategory = (id: MaterialCategory) => {
    setActiveCategory(id);
    const first = categoryById(id).stones[0];
    setActiveStoneId(first.id);
    setStoneLocked(false);
    setHoverStoneId(null);
    preload(first.image);
  };

  const selectStone = (stone: CatalogStone) => {
    setActiveStoneId(stone.id);
    setStoneLocked(true);
    setHoverStoneId(null);
    preload(stone.image);
  };

  return (
    <section
      id="catalogo"
      ref={sectionRef}
      className="relative overflow-hidden bg-neutral-950 section-pad"
      aria-label="Catálogo de materiais"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-neutral-950" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-graphite/80 via-neutral-950 to-graphite" />

      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />

      {/* Editorial index watermark */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`wm-${category.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pointer-events-none absolute right-4 top-8 z-[2] select-none font-semibold tracking-tighter text-ice/[0.04] md:right-10 md:top-12"
          style={{ fontSize: "clamp(6rem, 22vw, 16rem)", lineHeight: 1 }}
          aria-hidden
        >
          {category.index}
        </motion.span>
      </AnimatePresence>

      <div
        ref={contentRef}
        className="relative z-[3] mx-auto max-w-7xl flex flex-col px-6 md:px-10 lg:px-12"
      >
        {/* Header */}
        <header className="max-w-xl" data-catalog-reveal>
          <p className="label-premium">Catálogo</p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-ice">
            Materiais que transformam ambientes
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-concrete md:text-[0.9375rem]">
            Explore nossa seleção de mármores, granitos e quartzos e encontre a superfície ideal para cada projeto.
          </p>
        </header>

        {/* Navegação — uma única linha */}
        <nav
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-14 md:gap-x-12"
          aria-label="Categorias de material"
          data-catalog-reveal
        >
          {materialCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 py-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                  isActive ? "text-gold" : "text-concrete hover:text-ice/80",
                )}
              >
                <span className="tabular-nums">{cat.index}</span>
                {isActive && (
                  <span className="h-px w-8 bg-gold transition-all duration-500 md:w-10" aria-hidden />
                )}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop: split layout */}
        <div className="mt-12 flex flex-1 flex-col gap-10 lg:mt-14 lg:flex-row lg:items-stretch lg:gap-0">
          {/* Left panel — ~40% */}
          <div className="flex flex-col lg:w-[42%] lg:pr-10 xl:pr-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${category.id}-${activeStone.id}-${stoneLocked}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: CONTENT_TRANSITION_MS / 1000, ease: EASE }}
                className="flex flex-1 flex-col"
                data-catalog-reveal
              >
                <h3 className="text-lg font-medium leading-snug text-ice/90 md:text-xl">
                  {category.headline}
                </h3>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeStone.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="mt-6 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold uppercase tracking-tight text-ice"
                  >
                    {activeStone.name}
                  </motion.p>
                </AnimatePresence>

                <p className="mt-4 text-sm leading-relaxed text-concrete md:text-base">{activeStone.tagline}</p>

                <p className="mt-6 text-[10px] uppercase tracking-[0.16em] text-ice/40">Ideal para</p>
                <p className="mt-2 text-xs tracking-wide text-concrete">{activeStone.idealFor}</p>

                {/* Stone chips */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-ice/40">Coleção</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory lg:flex-wrap lg:overflow-visible">
                    {category.stones.map((stone) => {
                      const isActive = activeStone.id === stone.id;
                      const isPreview = hoverStoneId === stone.id;
                      return (
                        <button
                          key={stone.id}
                          type="button"
                          onMouseEnter={() => {
                            setHoverStoneId(stone.id);
                            preload(stone.image);
                          }}
                          onMouseLeave={() => setHoverStoneId(null)}
                          onFocus={() => {
                            setHoverStoneId(stone.id);
                            preload(stone.image);
                          }}
                          onBlur={() => setHoverStoneId(null)}
                          onClick={() => selectStone(stone)}
                          className={cn(
                            "group/chip flex shrink-0 snap-start items-center gap-2 border px-3 py-2 transition-all duration-300",
                            isActive
                              ? "border-gold/50 bg-ice/5 text-ice"
                              : isPreview
                                ? "border-ice/25 text-ice"
                                : "border-ice/10 text-concrete hover:border-ice/25 hover:text-ice",
                          )}
                        >
                          <span
                            className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center ring-1 ring-black/20"
                            style={{ backgroundImage: `url("${stone.image}")` }}
                          />
                          <span className="text-[11px] font-medium tracking-wide">{stone.name}</span>
                          <span
                            className={cn(
                              "text-gold transition-all duration-300",
                              isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover/chip:opacity-70",
                            )}
                            aria-hidden
                          >
                            ↗
                          </span>
                        </button>
                      );
                    })}
                    <span className="flex shrink-0 items-center px-2 text-[11px] text-ice/30">+ mais</span>
                  </div>
                </div>

                <p className="mt-6 tabular-nums text-[10px] tracking-[0.2em] text-ice/35">
                  {String(stoneIndex).padStart(2, "0")} / {String(category.stones.length).padStart(2, "0")}
                </p>

                <div className="mt-auto pt-10">
                  {stoneLocked ? (
                    <Link
                      href="#contato"
                      className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-ice transition-colors hover:text-gold"
                    >
                      <span className="h-px w-8 bg-gold transition-all group-hover:w-12" />
                      Solicitar orçamento
                      <span className="text-gold transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => selectStone(activeStone)}
                      className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-ice transition-colors hover:text-gold"
                    >
                      <span className="h-px w-8 bg-gold transition-all group-hover:w-12" />
                      {category.exploreCta}
                      <span className="text-gold transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel — stone reveal (~58%) — desktop only visual extension */}
          <div className="relative hidden min-h-[420px] flex-1 lg:block">
            <DesktopStoneReveal stone={previewStone} categoryLines={category.lines} />
          </div>
        </div>

        {/* Mobile: preview da pedra */}
        <MobileStonePreview stone={previewStone} category={category} />
      </div>
    </section>
  );
}

function DesktopStoneReveal({
  stone,
  categoryLines,
}: {
  stone: CatalogStone;
  categoryLines: [string, string, string];
}) {
  return (
    <div className="relative h-full min-h-[480px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stone.id}
          initial={{ opacity: 0, scale: 1.04, clipPath: "inset(8% 8% 8% 8%)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ opacity: 0, scale: 0.98, clipPath: "inset(4% 4% 4% 4%)" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -inset-[8%] bg-cover bg-center"
            style={{
              backgroundImage: `url("${stone.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 max-w-xs space-y-1">
        {categoryLines.map((line) => (
          <p key={line} className="text-xs tracking-wide text-ice/50">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function MobileStonePreview({
  stone,
  category,
}: {
  stone: CatalogStone;
  category: (typeof materialCategories)[0];
}) {
  return (
    <div className="mt-10 lg:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={stone.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${stone.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gold">{category.name}</p>
            <p className="mt-2 text-2xl font-semibold text-ice">{stone.name}</p>
            <p className="mt-2 text-sm text-concrete">{stone.tagline}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
