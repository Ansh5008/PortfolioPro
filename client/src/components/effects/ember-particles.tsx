import { motion } from "framer-motion";

const particles = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: `${10 + i * 10}%`,
  delay: i * 0.5,
}));

export default function EmberParticles() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="ember-particle animate-ember"
          style={{
            left: particle.left,
            animationDelay: `${particle.delay}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: particle.delay }}
        />
      ))}
    </div>
  );
}
