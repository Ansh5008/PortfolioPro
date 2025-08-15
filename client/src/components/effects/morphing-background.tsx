import { motion } from "framer-motion";

export default function MorphingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blood-red to-deep-red opacity-10 rounded-full blur-3xl"
        style={{ top: "10%", left: "10%" }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-deep-red to-blood-red opacity-8 rounded-full blur-3xl"
        style={{ top: "60%", right: "15%" }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-blood-red to-deep-red opacity-6 rounded-full blur-3xl"
        style={{ top: "30%", right: "50%" }}
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -60, 90, 0],
          scale: [1, 1.4, 0.7, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blood-red rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [0, 30, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}