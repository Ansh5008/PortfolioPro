import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const skills = [
  { icon: "fas fa-brain", label: "AI/ML", delay: 0 },
  { icon: "fab fa-python", label: "Python", delay: 0.1 },
  { icon: "fab fa-react", label: "React/Next", delay: 0.2 },
  { icon: "fas fa-cloud", label: "Google Cloud", delay: 0.3 },
  { icon: "fas fa-shield-alt", label: "Cybersecurity", delay: 0.4 },
  { icon: "fas fa-code", label: "APIs", delay: 0.5 },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  const handleDownloadCV = () => {
    // In production, this would trigger CV download
    console.log("Download CV clicked");
  };

  return (
    <section id="about" className="relative py-20 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="About" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="font-gothic text-2xl md:text-3xl font-semibold mb-6 text-blood-red">
                The Dark Arts of Code
              </h3>
              <p className="text-lg leading-relaxed mb-6 text-gothic-gray">
                Traversing the labyrinthine depths of artificial intelligence and cybersecurity, I forge 
                solutions that bridge the chasm between human intuition and machine precision. My journey 
                through the digital realm spans from <span className="text-blood-red">neural networks</span> that 
                think to <span className="text-blood-red">security systems</span> that protect.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-gothic-gray">
                As an <span className="text-blood-red">AI/ML enthusiast</span> and{" "}
                <span className="text-blood-red">cybersecurity specialist</span>, I've participated in{" "}
                <span className="text-blood-red">2+ hackathons</span> and contributed to numerous{" "}
                <span className="text-blood-red">open-source projects</span>, always seeking to push 
                the boundaries of what's possible.
              </p>
              
              <motion.button
                onClick={handleDownloadCV}
                className="glass-morphism px-6 py-3 rounded-lg cursor-glow hover:bg-blood-red hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-download-cv"
              >
                <span className="flex items-center space-x-2">
                  <motion.i
                    className="fas fa-download"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="glitch-text">Download CV</span>
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-gothic text-2xl md:text-3xl font-semibold mb-8 text-blood-red">
              Arsenal of Knowledge
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className="glass-morphism p-4 rounded-lg cursor-glow hover:bg-blood-red hover:text-white transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + skill.delay }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  data-testid={`skill-${skill.label.toLowerCase().replace("/", "-").replace(" ", "-")}`}
                >
                  <div className="text-center">
                    <motion.i
                      className={`${skill.icon} text-2xl mb-2`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <p className="font-semibold glitch-text">{skill.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
