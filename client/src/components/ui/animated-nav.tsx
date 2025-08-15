import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MagneticCursor from "@/components/effects/magnetic-cursor";
import GlitchText from "@/components/effects/glitch-text";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", icon: "fas fa-home" },
  { label: "About", href: "#about", icon: "fas fa-user" },
  { label: "Projects", href: "#projects", icon: "fas fa-code" },
  { label: "Experience", href: "#experience", icon: "fas fa-briefcase" },
  { label: "Blog", href: "#blog", icon: "fas fa-blog" },
  { label: "Open Source", href: "#opensource", icon: "fab fa-github" },
  { label: "Contact", href: "#contact", icon: "fas fa-envelope" },
];

export default function AnimatedNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-gothic-black/95 backdrop-blur-xl border-b border-blood-red/20" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Navigation Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blood-red/5 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Morphing background blob */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blood-red/10 to-deep-red/10 rounded-full blur-3xl"
          animate={{
            x: [0, 300, 600, 900, 1200],
            scale: [1, 1.5, 0.8, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <MagneticCursor strength={0.3}>
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blood-red to-deep-red rounded-lg flex items-center justify-center cursor-glow animate-glow-pulse"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                data-testid="logo"
              >
                <i className="fas fa-skull text-white text-xl" />
              </motion.div>
            </MagneticCursor>
            
            <motion.div
              className="font-gothic text-xl font-bold text-gothic-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlitchText triggerOnHover intensity={0.2}>
                AK
              </GlitchText>
            </motion.div>
          </motion.div>

          {/* Navigation Items */}
          <motion.div 
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onHoverStart={() => setHoveredItem(item.href)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <MagneticCursor strength={0.15}>
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-glow group ${
                      activeSection === item.href
                        ? "text-blood-red bg-blood-red/10"
                        : "text-gothic-text hover:text-blood-red hover:bg-gothic-dark/50"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {/* Background glow effect */}
                    <AnimatePresence>
                      {(hoveredItem === item.href || activeSection === item.href) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blood-red/20 to-deep-red/20 rounded-lg"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative flex items-center space-x-2">
                      <motion.i
                        className={`${item.icon} text-sm`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="font-medium">
                        <GlitchText 
                          triggerOnHover 
                          intensity={0.1}
                        >
                          {item.label}
                        </GlitchText>
                      </span>
                    </div>

                    {/* Active indicator */}
                    {activeSection === item.href && (
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blood-red rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </motion.button>
                </MagneticCursor>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gothic-text hover:text-blood-red cursor-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-testid="mobile-menu-button"
          >
            <i className="fas fa-bars text-xl" />
          </motion.button>
        </div>

        {/* Floating Navigation Dots */}
        <motion.div
          className="fixed right-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-4 z-50"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {navItems.map((item, index) => (
            <MagneticCursor key={item.href} strength={0.2}>
              <motion.button
                onClick={() => scrollToSection(item.href)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-glow group relative ${
                  activeSection === item.href
                    ? "bg-blood-red border-blood-red scale-125"
                    : "border-gothic-text/30 hover:border-blood-red hover:bg-blood-red/20"
                }`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
                data-testid={`nav-dot-${item.label.toLowerCase()}`}
              >
                {/* Tooltip */}
                <motion.div
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gothic-black/90 text-gothic-text px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gothic-black/90 border-y-4 border-y-transparent" />
                </motion.div>
              </motion.button>
            </MagneticCursor>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}