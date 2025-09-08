import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { scrollTo } from "@/hooks/use-lenis";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";
import { Parallax } from "@/components/effects/parallax";

export default function GamingHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToNext = () => {
    scrollTo("#about", { duration: 1.5, offset: -100 });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ef4444" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Moving particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              animate={{
                x: [0, window.innerWidth || 1920],
                y: [Math.random() * (window.innerHeight || 1080), Math.random() * (window.innerHeight || 1080)],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
            />
          ))}
        </div>

        {/* Cursor follower */}
        <motion.div
          className="absolute w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-red-600/10 border border-red-600/30 rounded-full px-6 py-2 text-red-400 font-gaming text-sm">
              100% FREE
            </div>
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="font-gothic text-6xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-red-500 via-red-300 to-red-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            GAME UI
          </motion.h1>

          <motion.h2
            className="font-gaming text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            PERSONAL PORTFOLIO
          </motion.h2>

          {/* Navigation buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { id: "about", label: "BEGINNING", active: false },
              { id: "projects", label: "LOGS", active: false },
              { id: "experience", label: "CRAFTSMANSHIPS", active: false },
              { id: "contact", label: "CREATIONS", active: false },
              { id: "contact", label: "ABOUT ME", active: true },
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => scrollTo(`#${item.id}`, { duration: 1.5, offset: -100 })}
                className={`px-6 py-3 text-sm font-bold font-gaming transition-all duration-300 border ${
                  item.active
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-transparent text-red-400 border-red-600/50 hover:bg-red-600/20 hover:text-white'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={handleScrollToNext}
              className="group relative px-8 py-4 bg-red-600 text-white font-gaming font-bold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">START EXPERIENCE</span>
              <motion.div
                className="absolute inset-0 bg-red-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-red-400 rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-red-400 rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}