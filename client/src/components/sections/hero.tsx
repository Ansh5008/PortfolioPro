import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EmberParticles from "@/components/effects/ember-particles";
import TypingAnimation from "@/components/effects/typing-animation";
import GlitchText from "@/components/effects/glitch-text";
import MagneticCursor from "@/components/effects/magnetic-cursor";
import TextReveal from "@/components/effects/text-reveal";
import MorphingText from "@/components/effects/morphing-text";
import FloatingElements from "@/components/effects/floating-elements";
import { scrollTo } from "@/hooks/use-lenis";
import { ParallaxText } from "@/components/effects/parallax";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const scrollToSection = (sectionId: string) => {
    scrollTo(sectionId, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
  };

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <EmberParticles />
        <FloatingElements count={25} />
      </motion.div>
      
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        {/* Hero Title */}
        <motion.h1
          className="font-gothic text-6xl md:text-8xl lg:text-9xl font-bold mb-6 glow-text"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          data-testid="hero-title"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <GlitchText triggerOnHover>Ansh</GlitchText>
          </motion.span>
          <motion.span
            className="block text-blood-red"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <GlitchText triggerOnHover>Kumar</GlitchText>
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-xl md:text-2xl lg:text-3xl mb-8 font-light h-12 flex items-center justify-center">
            <MorphingText 
              words={["AI/ML Engineer", "Cybersecurity Expert", "Open Source Contributor", "Cloud Architect", "Full Stack Developer"]}
              className="text-blood-red font-medium"
              duration={2500}
              morphStyle="glitch"
            />
          </div>
          <div className="text-lg md:text-xl text-gothic-gray mb-12">
            <TypingAnimation 
              text="Crafting intelligent solutions with bleeding-edge technology"
              speed={50}
              startDelay={1500}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MagneticCursor strength={0.2}>
            <motion.button
              onClick={() => scrollToSection("#projects")}
              className="glass-morphism px-8 py-4 rounded-lg cursor-glow hover:bg-blood-red hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-view-work"
            >
              <span className="flex items-center justify-center space-x-2">
                <GlitchText triggerOnHover>View Work</GlitchText>
                <motion.i
                  className="fas fa-arrow-right"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                />
              </span>
            </motion.button>
          </MagneticCursor>

          <MagneticCursor strength={0.2}>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="border border-blood-red text-blood-red px-8 py-4 rounded-lg cursor-glow hover:bg-blood-red hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-contact"
            >
              <span className="flex items-center justify-center space-x-2">
                <GlitchText triggerOnHover>Get in Touch</GlitchText>
                <motion.i
                  className="fas fa-envelope"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </span>
            </motion.button>
          </MagneticCursor>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        data-testid="scroll-indicator"
      >
        <div className="w-6 h-10 border-2 border-blood-red rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blood-red rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
