"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "#configurador", label: "Materiais" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled ? "glass border-b border-ice/5 py-3" : "bg-transparent py-5 md:py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="#" className="relative block">
            <Image
              src="/images/logo-dourada.png"
              alt="Granorte Marmoraria"
              width={140}
              height={36}
              className={cn("h-7 w-auto transition-all duration-500 md:h-8", scrolled && "h-6 md:h-7")}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-sm text-concrete transition-colors hover:text-ice"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <MagneticButton href="#contato" className="hidden px-6 py-3 text-xs sm:inline-flex md:px-8 md:text-sm">
              Orçamento gratuito
            </MagneticButton>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              className="relative z-[60] flex h-10 w-10 flex-col items-end justify-center gap-1.5 lg:hidden"
            >
              <span className={cn("block h-px w-5 bg-ice transition-all", open && "w-5 translate-y-[3px] rotate-45")} />
              <span className={cn("block h-px w-3.5 bg-ice transition-all", open && "w-5 -translate-y-[3px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] glass flex flex-col justify-center px-10"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-3xl font-light tracking-tight text-ice/90 hover:text-gold"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10">
              <MagneticButton href="#contato" onClick={() => setOpen(false)}>
                Solicitar orçamento gratuito
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
