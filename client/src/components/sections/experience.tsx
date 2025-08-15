import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import Timeline from "@/components/ui/timeline";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const experiences = [
  {
    id: "codsoft-intern",
    title: "AI/ML Intern",
    company: "CODSOFT",
    period: "June 2024 - August 2024",
    description: "Developed machine learning models for predictive analytics, improved model accuracy by 25%, and implemented automated data preprocessing pipelines.",
    position: "left" as const,
    delay: 0,
  },
  {
    id: "hackathons",
    title: "Hackathon Participant",
    company: "TechFest 2024 & CodeStorm",
    period: "March 2024 - Present",
    description: "Participated in 2+ hackathons, developing innovative solutions for real-world problems. Led teams in AI-driven projects and won recognition for creative problem-solving.",
    position: "right" as const,
    delay: 0.2,
  },
  {
    id: "opensource",
    title: "Open Source Contributor",
    company: "Various Projects",
    period: "2023 - Present",
    description: "Active contributor to open-source projects in AI/ML and cybersecurity. Maintained GitHub repositories with 500+ stars and contributed to major frameworks.",
    position: "left" as const,
    delay: 0.4,
  },
];

export default function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="relative py-20 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Journey Through Darkness" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Timeline experiences={experiences} isVisible={isVisible} />
        </motion.div>
      </div>
    </section>
  );
}
