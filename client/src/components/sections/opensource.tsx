import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const repositories = [
  {
    name: "ansh-kumar/schronix",
    description: "Smart academic scheduler with AI optimization",
    stars: 45,
    forks: 12,
  },
  {
    name: "ansh-kumar/ai-financial-advisor",
    description: "GPT-4 powered financial guidance for students",
    stars: 32,
    forks: 8,
  },
  {
    name: "ansh-kumar/cybersec-toolkit",
    description: "Educational cybersecurity learning tools",
    stars: 67,
    forks: 23,
  },
];

const contributionSquares = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  intensity: Math.random(),
}));

export default function OpenSource() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="opensource" className="relative py-20 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Open Source Grimoire" />
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* GitHub Activity */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="font-gothic text-2xl font-semibold mb-6 text-blood-red">
                GitHub Activity
              </h3>
              <div className="space-y-6">
                {repositories.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    className="flex items-center justify-between p-4 bg-gothic-dark rounded-lg cursor-glow hover:bg-blood-red hover:bg-opacity-10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    data-testid={`repo-${repo.name.split("/")[1]}`}
                  >
                    <div>
                      <h4 className="font-semibold text-blood-red">{repo.name}</h4>
                      <p className="text-gothic-gray text-sm">{repo.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-gothic-muted text-sm">
                        <span>
                          <i className="fas fa-star text-blood-red" /> {repo.stars}
                        </span>
                        <span>
                          <i className="fas fa-code-branch text-blood-red" /> {repo.forks}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="font-gothic text-2xl font-semibold mb-6 text-blood-red">
                Contribution Graph
              </h3>
              
              <motion.div
                className="grid grid-cols-12 gap-1 mb-6"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {contributionSquares.map((square) => (
                  <motion.div
                    key={square.id}
                    className={`w-3 h-3 rounded-sm ${
                      square.intensity > 0.7
                        ? "bg-blood-red bg-opacity-90"
                        : square.intensity > 0.4
                        ? "bg-blood-red bg-opacity-60"
                        : square.intensity > 0.2
                        ? "bg-blood-red bg-opacity-30"
                        : "bg-gothic-dark"
                    }`}
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + square.id * 0.05 }}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </motion.div>
              
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="text-3xl font-bold text-blood-red">500+</div>
                <p className="text-gothic-gray">Contributions this year</p>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-3 gap-4 mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div>
                  <div className="text-xl font-bold text-blood-red" data-testid="stat-repositories">15</div>
                  <p className="text-gothic-gray text-sm">Repositories</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-blood-red" data-testid="stat-stars">150</div>
                  <p className="text-gothic-gray text-sm">Stars</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-blood-red" data-testid="stat-forks">45</div>
                  <p className="text-gothic-gray text-sm">Forks</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
