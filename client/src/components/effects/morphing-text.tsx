import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface MorphingTextProps {
  words: string[];
  className?: string;
  duration?: number;
  staggerDelay?: number;
  morphStyle?: "fade" | "slide" | "glitch" | "typewriter";
}

export default function MorphingText({ 
  words, 
  className = "", 
  duration = 3000,
  staggerDelay = 100,
  morphStyle = "fade"
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (morphStyle === "typewriter") {
      const currentWord = words[currentIndex];
      
      const typeSpeed = isDeleting ? 50 : 100;
      
      const timer = setTimeout(() => {
        if (!isDeleting && displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else if (isDeleting && displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else if (!isDeleting && displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), duration);
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      }, typeSpeed);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, displayText, isDeleting, words, duration, morphStyle]);

  const getVariants = () => {
    switch (morphStyle) {
      case "slide":
        return {
          enter: { opacity: 0, y: 20, rotateX: 90 },
          center: { opacity: 1, y: 0, rotateX: 0 },
          exit: { opacity: 0, y: -20, rotateX: -90 }
        };
      case "glitch":
        return {
          enter: { 
            opacity: 0, 
            scaleX: 0.8, 
            scaleY: 1.2,
            filter: "blur(10px) contrast(200%)"
          },
          center: { 
            opacity: 1, 
            scaleX: 1, 
            scaleY: 1,
            filter: "blur(0px) contrast(100%)"
          },
          exit: { 
            opacity: 0, 
            scaleX: 1.2, 
            scaleY: 0.8,
            filter: "blur(10px) contrast(200%)"
          }
        };
      default:
        return {
          enter: { opacity: 0, scale: 0.8 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 }
        };
    }
  };

  if (morphStyle === "typewriter") {
    return (
      <div className={className}>
        <span>{displayText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="border-r-2 border-blood-red ml-1"
        >
          |
        </motion.span>
      </div>
    );
  }

  const variants = getVariants();

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {morphStyle === "glitch" ? (
            <div className="relative">
              <span className="relative z-10">{words[currentIndex]}</span>
              <span 
                className="absolute top-0 left-0 text-blood-red opacity-70"
                style={{ transform: "translate(-2px, -1px)" }}
              >
                {words[currentIndex]}
              </span>
              <span 
                className="absolute top-0 left-0 text-blue-500 opacity-70"
                style={{ transform: "translate(2px, 1px)" }}
              >
                {words[currentIndex]}
              </span>
            </div>
          ) : (
            words[currentIndex].split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * staggerDelay / 1000,
                  duration: 0.3
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}