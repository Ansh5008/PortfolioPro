import { motion } from "framer-motion";
import { scrollTo } from "@/hooks/use-lenis";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";
import { Parallax, ParallaxText } from "@/components/effects/parallax";

export function SmoothScrollDemo() {
  const sections = [
    { id: "#demo-section-1", label: "Fade In Animation" },
    { id: "#demo-section-2", label: "Slide Up Effect" },
    { id: "#demo-section-3", label: "Parallax Background" },
    { id: "#demo-section-4", label: "Scale Animation" },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      {/* Demo Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollTo(section.id, { duration: 1.5 })}
            className="block bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg 
                     hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.label}
          </motion.button>
        ))}
      </div>

      {/* Demo Sections */}
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        {/* Section 1: Fade In */}
        <ScrollTriggerWrapper animation="fadeIn" duration={1.5}>
          <section id="demo-section-1" className="text-center py-20">
            <h2 className="text-5xl font-bold text-white mb-8">Buttery Smooth Scrolling</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experience seamless navigation with Lenis smooth scroll. Every movement feels natural 
              and responsive, creating an immersive browsing experience.
            </p>
          </section>
        </ScrollTriggerWrapper>

        {/* Section 2: Slide Up with Parallax */}
        <Parallax speed={0.4} direction="up">
          <ScrollTriggerWrapper animation="slideUp" duration={1.2} delay={0.2}>
            <section id="demo-section-2" className="bg-white/5 backdrop-blur-md rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6">Scroll-Triggered Animations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                  <p className="text-gray-300">Fade in animations that trigger as elements enter the viewport</p>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-64 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg"></div>
                  <p className="text-gray-300">Slide effects that create dynamic visual hierarchy</p>
                </div>
              </div>
            </section>
          </ScrollTriggerWrapper>
        </Parallax>

        {/* Section 3: Parallax Text Effect */}
        <ParallaxText className="py-20">
          <section id="demo-section-3" className="text-center">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-8">
              Parallax Magic
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Text and elements that move at different speeds create depth and visual interest.
              This parallax effect adds a layer of sophistication to your scrolling experience.
            </p>
          </section>
        </ParallaxText>

        {/* Section 4: Scale Animation */}
        <ScrollTriggerWrapper animation="scale" duration={1.8}>
          <section id="demo-section-4" className="text-center py-20">
            <motion.div
              className="bg-gradient-to-br from-pink-500 to-violet-600 rounded-3xl p-16 mx-auto max-w-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Production Ready</h2>
              <p className="text-xl text-white/90 mb-8">
                Cross-browser compatible, optimized for performance, and built with modern web standards.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🎯</span>
                </div>
              </div>
            </motion.div>
          </section>
        </ScrollTriggerWrapper>
      </div>
    </div>
  );
}