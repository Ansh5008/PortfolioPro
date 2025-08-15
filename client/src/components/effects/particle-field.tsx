import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  direction: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
  interactive?: boolean;
  colors?: string[];
  speed?: number;
}

export default function ParticleField({ 
  count = 50, 
  className = "",
  interactive = true,
  colors = ["rgba(155, 17, 30, 0.6)", "rgba(122, 0, 0, 0.4)", "rgba(255, 255, 255, 0.2)"],
  speed = 1
}: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  const createParticle = (id: number): Particle => ({
    id,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1,
    speed: (Math.random() * speed + 0.5),
    opacity: Math.random() * 0.8 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    direction: Math.random() * Math.PI * 2,
    life: 0,
    maxLife: Math.random() * 300 + 100
  });

  useEffect(() => {
    const initialParticles = Array.from({ length: count }, (_, i) => createParticle(i));
    setParticles(initialParticles);
  }, [count, colors, speed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsMouseInside(true);
    const handleMouseLeave = () => setIsMouseInside(false);

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseenter", handleMouseEnter);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [interactive]);

  useEffect(() => {
    if (particles.length === 0) return;

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;
          let newLife = particle.life + 1;
          let newOpacity = particle.opacity;
          let newSize = particle.size;

          // Mouse interaction
          if (interactive && isMouseInside) {
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const force = (150 - distance) / 150;
              newX += (dx / distance) * force * 2;
              newY += (dy / distance) * force * 2;
              newOpacity = Math.min(1, particle.opacity + force * 0.5);
              newSize = particle.size * (1 + force * 0.5);
            }
          }

          // Boundary wrapping
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          // Life cycle
          if (newLife > particle.maxLife) {
            return createParticle(particle.id);
          }

          // Fade effect based on life
          const lifeFactor = 1 - (newLife / particle.maxLife);
          newOpacity *= lifeFactor;

          return {
            ...particle,
            x: newX,
            y: newY,
            life: newLife,
            opacity: Math.max(0, newOpacity),
            size: newSize
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [particles.length > 0, interactive, isMouseInside]);

  const connections = useMemo(() => {
    const result: { from: Particle; to: Particle; distance: number }[] = [];
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          result.push({ from: particles[i], to: particles[j], distance });
        }
      }
    }
    
    return result.slice(0, 20); // Limit connections for performance
  }, [particles]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg className="w-full h-full">
        {/* Connection lines */}
        {connections.map(({ from, to, distance }, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(155, 17, 30, 0.2)"
            strokeWidth={1}
            opacity={(100 - distance) / 100}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
        
        {/* Particles */}
        {particles.map(particle => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Additional glow effects */}
      {particles.slice(0, 10).map(particle => (
        <motion.div
          key={`glow-${particle.id}`}
          className="absolute rounded-full blur-sm"
          style={{
            left: particle.x - particle.size * 2,
            top: particle.y - particle.size * 2,
            width: particle.size * 4,
            height: particle.size * 4,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            opacity: particle.opacity * 0.5
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [particle.opacity * 0.3, particle.opacity * 0.7, particle.opacity * 0.3]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}