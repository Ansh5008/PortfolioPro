import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
  triggerOnHover?: boolean;
}

const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

export default function GlitchText({ 
  children, 
  intensity = 0.1,
  className = "",
  triggerOnHover = false
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);
  const originalText = children?.toString() || "";

  const glitchText = () => {
    if (!originalText) return;
    
    let glitched = "";
    for (let i = 0; i < originalText.length; i++) {
      if (Math.random() < intensity) {
        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitched += originalText[i];
      }
    }
    return glitched;
  };

  const startGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    
    let iterations = 0;
    const maxIterations = 8;
    
    const glitchInterval = setInterval(() => {
      setDisplayText(glitchText());
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(glitchInterval);
        setDisplayText(originalText);
        setIsGlitching(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (!triggerOnHover) {
      const randomInterval = setInterval(() => {
        if (Math.random() < 0.1) {
          startGlitch();
        }
      }, 3000);
      
      return () => clearInterval(randomInterval);
    }
  }, [triggerOnHover]);

  return (
    <motion.span 
      className={className}
      onMouseEnter={triggerOnHover ? startGlitch : undefined}
      animate={isGlitching ? {
        x: [0, -1, 1, 0],
        textShadow: [
          "none",
          "2px 0 #ff0000, -2px 0 #00ff00",
          "none",
          "1px 0 #ff0000, -1px 0 #00ff00",
          "none"
        ]
      } : {}}
      transition={{ duration: 0.1 }}
    >
      {displayText}
    </motion.span>
  );
}