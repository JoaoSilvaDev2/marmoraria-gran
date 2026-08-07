import Hero from "@/components/sections/Hero";
import Differentials from "@/components/sections/Differentials";
import StoneExplorer from "@/components/sections/StoneExplorer";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Metrics from "@/components/sections/Metrics";
import Testimonials from "@/components/sections/Testimonials";
import CtaFinal from "@/components/sections/CtaFinal";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentials />
      <StoneExplorer />
      <BeforeAfter />
      <Projects />
      <Process />
      <Metrics />
      <Testimonials />
      <CtaFinal />
      <Contact />
    </>
  );
}
