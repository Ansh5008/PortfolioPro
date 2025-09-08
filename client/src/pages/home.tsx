import { useEffect } from "react";
import GamingSidebar from "@/components/layout/gaming-sidebar";
import GamingHeader from "@/components/layout/gaming-header";
import GamingHero from "@/components/sections/gaming-hero";
import About from "@/components/sections/about";
import GamingProjects from "@/components/sections/gaming-projects";
import GamingExperience from "@/components/sections/gaming-experience";
import Blog from "@/components/sections/blog";
import OpenSource from "@/components/sections/opensource";
import GamingContact from "@/components/sections/gaming-contact";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";
import { Parallax } from "@/components/effects/parallax";


export default function Home() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "Jay Malone - Game UI Designer & Developer";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Portfolio of Jay Malone - UI/UX Designer, Game Interface Specialist, and Creative Developer crafting immersive digital experiences"
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-gothic-text overflow-x-hidden">
      <GamingHeader />
      <GamingSidebar />
      
      <main className="relative z-10 lg:pl-64">
        <GamingHero />
        
        <ScrollTriggerWrapper animation="fadeIn" duration={1.2}>
          <GamingProjects />
        </ScrollTriggerWrapper>
        
        <ScrollTriggerWrapper animation="slideLeft" duration={1} delay={0.1}>
          <GamingExperience />
        </ScrollTriggerWrapper>
        
        <ScrollTriggerWrapper animation="scale" duration={1.2}>
          <GamingContact />
        </ScrollTriggerWrapper>
      </main>
    </div>
  );
}
