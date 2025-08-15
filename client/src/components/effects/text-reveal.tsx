import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  animationType?: "slide" | "fade" | "scale" | "rotate";
}

export default function TextReveal({ 
  children, 
  className = "", 
  delay = 0, 
  staggerChildren = 0.05,
  animationType = "slide"
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const getVariants = () => {
    switch (animationType) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 }
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  };

  const childVariants = getVariants();

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}