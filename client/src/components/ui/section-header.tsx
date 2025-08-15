import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      data-testid={`section-header-${title.toLowerCase().replace(" ", "-")}`}
    >
      <motion.h2
        className="font-gothic text-4xl md:text-6xl font-bold mb-4 glow-text"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-blood-red to-deep-red mx-auto"
        initial={{ width: 0 }}
        animate={isVisible ? { width: 96 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>
  );
}
