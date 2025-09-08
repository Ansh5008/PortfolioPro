import { useEffect } from "react";
import AnimatedNav from "@/components/ui/animated-nav";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Blog from "@/components/sections/blog";
import OpenSource from "@/components/sections/opensource";
import Contact from "@/components/sections/contact";
import GrainOverlay from "@/components/effects/grain-overlay";
import FogLayer from "@/components/effects/fog-layer";
import MorphingBackground from "@/components/effects/morphing-background";
import ScrollProgress from "@/components/effects/scroll-progress";
import CursorTrail from "@/components/effects/cursor-trail";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";
import { Parallax } from "@/components/effects/parallax";


export default function Home() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "Ansh Kumar - AI/ML & Cybersecurity Specialist";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Portfolio of Ansh Kumar - AI/ML Engineer, Cybersecurity Expert, and Open Source Contributor crafting intelligent solutions with bleeding-edge technology"
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gothic-black text-gothic-text overflow-x-hidden">
      <ScrollProgress />
      <CursorTrail />
      <GrainOverlay />
      <FogLayer />
      <MorphingBackground />

      
      <AnimatedNav />
      
      <main className="relative z-10">
        <Hero />
        
        <ScrollTriggerWrapper animation="fadeIn" duration={1.2}>
          <About />
        </ScrollTriggerWrapper>
        
        <Parallax speed={0.3} direction="up">
          <ScrollTriggerWrapper animation="slideUp" duration={1} delay={0.2}>
            <Projects />
          </ScrollTriggerWrapper>
        </Parallax>
        
        <ScrollTriggerWrapper animation="slideLeft" duration={1} delay={0.1}>
          <Experience />
        </ScrollTriggerWrapper>
        
        <Parallax speed={0.2} direction="down">
          <ScrollTriggerWrapper animation="fadeIn" duration={1.5}>
            <Blog />
          </ScrollTriggerWrapper>
        </Parallax>
        
        <ScrollTriggerWrapper animation="slideRight" duration={1} delay={0.3}>
          <OpenSource />
        </ScrollTriggerWrapper>
        
        <ScrollTriggerWrapper animation="scale" duration={1.2}>
          <Contact />
        </ScrollTriggerWrapper>
      </main>
      
      <Footer />
    </div>
  );
}
