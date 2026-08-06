import Hero from "@/components/sections/Hero";
import Differentials from "@/components/sections/Differentials";
import StoneConfigurator from "@/components/sections/StoneConfigurator";
import StoneGallery from "@/components/sections/StoneGallery";
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
      <StoneConfigurator />
      <StoneGallery />
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
