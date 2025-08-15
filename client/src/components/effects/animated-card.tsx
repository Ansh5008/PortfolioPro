import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  perspective?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  glowColor = "rgba(155, 17, 30, 0.5)",
  intensity = 1,
  perspective = 1000
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [15 * intensity, -15 * intensity]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-15 * intensity, 15 * intensity]
  );
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className={`relative group ${className}`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 40%)`,
        }}
        animate={{
          background: [
            `radial-gradient(600px circle at 0% 0%, ${glowColor}, transparent 40%)`,
            `radial-gradient(600px circle at 100% 100%, ${glowColor}, transparent 40%)`,
            `radial-gradient(600px circle at 0% 100%, ${glowColor}, transparent 40%)`,
            `radial-gradient(600px circle at 100% 0%, ${glowColor}, transparent 40%)`,
            `radial-gradient(600px circle at 0% 0%, ${glowColor}, transparent 40%)`
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner glow */}
      <motion.div
        className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-transparent via-gothic-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${glowColor.replace('0.5', '0.1')} 50%, transparent 100%)`
        }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{
          background: [
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            "linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <div 
        className="relative z-10"
        style={{ transform: "translateZ(50px)" }}
      >
        {children}
      </div>
      
      {/* Floating particles on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blood-red rounded-full opacity-0 group-hover:opacity-100"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Border animation */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
          padding: '1px',
        }}
        animate={{
          background: [
            `linear-gradient(0deg, ${glowColor}, transparent, ${glowColor})`,
            `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
            `linear-gradient(180deg, ${glowColor}, transparent, ${glowColor})`,
            `linear-gradient(270deg, ${glowColor}, transparent, ${glowColor})`,
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gothic-black rounded-xl" />
      </motion.div>
    </motion.div>
  );
}