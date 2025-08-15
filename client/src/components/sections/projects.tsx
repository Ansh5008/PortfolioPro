import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import ProjectCard from "@/components/ui/project-card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const projects = [
  {
    id: "schronix",
    title: "Schronix",
    description: "Smart Academic Scheduler & Attendance Planner powered by AI algorithms for optimal time management and academic success.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["AI/ML", "Python", "Scheduling"],
    githubUrl: "https://github.com/ansh-kumar/schronix",
    liveUrl: "https://schronix.demo.com",
    delay: 0,
  },
  {
    id: "ai-financial-advisor",
    title: "AI Financial Advisor",
    description: "GPT-4 powered financial advisor designed specifically for students, providing personalized budgeting and investment guidance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["GPT-4", "Finance", "API"],
    githubUrl: "https://github.com/ansh-kumar/ai-financial-advisor",
    liveUrl: "https://ai-advisor.demo.com",
    delay: 0.2,
  },
  {
    id: "face-recognition",
    title: "Face Recognition System",
    description: "Advanced facial detection and recognition system using Haar Cascades and ArcFace for real-time identification.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Computer Vision", "OpenCV", "ArcFace"],
    githubUrl: "https://github.com/ansh-kumar/face-recognition",
    liveUrl: "https://face-rec.demo.com",
    delay: 0.4,
  },
  {
    id: "mood-detection",
    title: "Mood Detection AI",
    description: "Real-time emotion recognition system that analyzes facial expressions and voice patterns to determine emotional states.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Emotion AI", "TensorFlow", "NLP"],
    githubUrl: "https://github.com/ansh-kumar/mood-detection",
    liveUrl: "https://mood-ai.demo.com",
    delay: 0.6,
  },
  {
    id: "security-toolkit",
    title: "Security Toolkit",
    description: "Educational cybersecurity toolkit for learning penetration testing and vulnerability assessment techniques.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Cybersecurity", "Python", "Educational"],
    githubUrl: "https://github.com/ansh-kumar/security-toolkit",
    liveUrl: null,
    delay: 0.8,
  },
  {
    id: "cloud-kms",
    title: "Cloud KMS Manager",
    description: "Google Cloud Key Management Service integration tool for secure encryption key management and rotation.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    tags: ["Google Cloud", "KMS", "Security"],
    githubUrl: "https://github.com/ansh-kumar/cloud-kms-manager",
    liveUrl: "https://kms-manager.demo.com",
    delay: 1.0,
  },
];

export default function Projects() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="relative py-20 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Dark Creations" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: project.delay }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
