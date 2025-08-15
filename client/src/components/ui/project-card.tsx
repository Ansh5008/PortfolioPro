import { motion } from "framer-motion";
import { useState } from "react";
import MagneticCursor from "@/components/effects/magnetic-cursor";
import GlitchText from "@/components/effects/glitch-text";
import AnimatedCard from "@/components/effects/animated-card";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string | null;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleLinkClick = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <MagneticCursor strength={0.15}>
      <motion.div
        className="project-card glass-morphism rounded-xl overflow-hidden cursor-glow group"
        whileHover={{ 
          scale: 1.02,
          rotateX: 5,
          rotateY: 10,
          y: -10,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ transformStyle: "preserve-3d" }}
        data-testid={`project-card-${project.id}`}
      >
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={`${project.title} project screenshot`}
          className="w-full h-48 object-cover transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gothic-black via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <motion.h3
          className="font-gothic text-xl font-semibold mb-3 text-blood-red"
          whileHover={{ x: 2 }}
        >
          <GlitchText triggerOnHover intensity={0.3}>
            {project.title}
          </GlitchText>
        </motion.h3>
        
        <p className="text-gothic-gray mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="px-3 py-1 bg-blood-red bg-opacity-20 text-blood-red rounded-full text-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              data-testid={`tag-${tag.toLowerCase().replace("/", "-").replace(" ", "-")}`}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <motion.button
            onClick={(e) => handleLinkClick(project.githubUrl, e)}
            className="flex items-center space-x-2 text-gothic-text hover:text-blood-red transition-colors cursor-glow"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`link-github-${project.id}`}
          >
            <i className="fab fa-github" />
            <span>Code</span>
          </motion.button>
          
          {project.liveUrl && (
            <motion.button
              onClick={(e) => handleLinkClick(project.liveUrl!, e)}
              className="flex items-center space-x-2 text-gothic-text hover:text-blood-red transition-colors cursor-glow"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`link-live-${project.id}`}
            >
              <i className="fas fa-external-link-alt" />
              <span>Live</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
    </MagneticCursor>
  );
}
