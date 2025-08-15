import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  shape: "circle" | "square" | "triangle" | "cross";
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export default function FloatingElements({ count = 15, className = "" }: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      shape: ["circle", "square", "triangle", "cross"][Math.floor(Math.random() * 4)] as FloatingElement["shape"]
    }));
    
    setElements(newElements);
  }, [count]);

  const getShapeElement = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-20";
    const style = {
      width: element.size,
      height: element.size,
      left: `${element.x}%`,
      top: `${element.y}%`,
    };

    switch (element.shape) {
      case "circle":
        return (
          <motion.div
            className={`${baseClasses} rounded-full bg-blood-red`}
            style={style}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      case "square":
        return (
          <motion.div
            className={`${baseClasses} bg-gradient-to-br from-blood-red to-deep-red`}
            style={style}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 0.8, 1],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      
      case "triangle":
        return (
          <motion.div
            className={`${baseClasses}`}
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${element.size/2}px solid transparent`,
              borderRight: `${element.size/2}px solid transparent`,
              borderBottom: `${element.size}px solid rgba(155, 17, 30, 0.3)`,
            }}
            animate={{
              rotate: [0, -360],
              y: [-30, 30, -30],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      
      case "cross":
        return (
          <motion.div
            className={`${baseClasses} flex items-center justify-center text-blood-red font-bold`}
            style={{
              ...style,
              fontSize: element.size * 0.8
            }}
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✦
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element) => (
        <div key={element.id}>
          {getShapeElement(element)}
        </div>
      ))}
    </div>
  );
}