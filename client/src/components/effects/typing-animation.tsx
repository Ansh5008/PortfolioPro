import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  startDelay?: number;
}

export default function TypingAnimation({ 
  text, 
  speed = 100, 
  className = "", 
  showCursor = true,
  startDelay = 0
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.substring(0, index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: isTyping ? [1, 0] : 1 }}
          transition={{ 
            duration: 0.8, 
            repeat: isTyping ? Infinity : 0, 
            repeatType: "reverse" 
          }}
          className="text-blood-red"
        >
          |
        </motion.span>
      )}
    </span>
  );
}