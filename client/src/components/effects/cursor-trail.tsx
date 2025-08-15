import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
  id: number;
}

export default function CursorTrail() {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setPoints(prev => [newPoint, ...prev.slice(0, 19)]); // Keep last 20 points
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {points.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-3 h-3 bg-blood-red rounded-full"
          style={{
            left: point.x - 6,
            top: point.y - 6,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.3,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}