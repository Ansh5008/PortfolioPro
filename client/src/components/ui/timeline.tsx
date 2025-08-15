import { motion } from "framer-motion";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  position: "left" | "right";
  delay: number;
}

interface TimelineProps {
  experiences: Experience[];
  isVisible: boolean;
}

export default function Timeline({ experiences, isVisible }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blood-red to-deep-red"
        style={{ height: "100%" }}
        initial={{ height: 0 }}
        animate={isVisible ? { height: "100%" } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      {/* Timeline items */}
      <div className="space-y-12">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="flex items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: exp.delay }}
            data-testid={`timeline-item-${exp.id}`}
          >
            {exp.position === "left" ? (
              <>
                <div className="w-1/2 pr-8 text-right">
                  <motion.div
                    className="glass-morphism p-6 rounded-xl cursor-glow hover:bg-blood-red hover:bg-opacity-10 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: -5 }}
                  >
                    <h3 className="font-gothic text-xl font-semibold text-blood-red mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-gothic-gray mb-2">{exp.company}</p>
                    <p className="text-sm text-gothic-muted mb-3">{exp.period}</p>
                    <p className="text-gothic-gray">{exp.description}</p>
                  </motion.div>
                </div>
                <div className="relative z-10">
                  <motion.div
                    className="w-6 h-6 bg-blood-red rounded-full border-4 border-gothic-black animate-pulse"
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: exp.delay + 0.3 }}
                  />
                </div>
                <div className="w-1/2 pl-8" />
              </>
            ) : (
              <>
                <div className="w-1/2 pr-8" />
                <div className="relative z-10">
                  <motion.div
                    className="w-6 h-6 bg-blood-red rounded-full border-4 border-gothic-black animate-pulse"
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: exp.delay + 0.3 }}
                  />
                </div>
                <div className="w-1/2 pl-8">
                  <motion.div
                    className="glass-morphism p-6 rounded-xl cursor-glow hover:bg-blood-red hover:bg-opacity-10 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <h3 className="font-gothic text-xl font-semibold text-blood-red mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-gothic-gray mb-2">{exp.company}</p>
                    <p className="text-sm text-gothic-muted mb-3">{exp.period}</p>
                    <p className="text-gothic-gray">{exp.description}</p>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
