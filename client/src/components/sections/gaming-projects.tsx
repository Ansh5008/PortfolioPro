import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  status: string;
  timeAgo: string;
  category: "dashboard" | "website" | "marketplace";
}

export default function GamingProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "expanded">("grid");

  const projects: Project[] = [
    {
      id: "project-1",
      title: "THE PROJECT NAME",
      subtitle: "DASHBOARD INTERFACE KIT",
      description: "USER DISPLAY SPEARHEADING MY PAST & CURRENT DESIGN EXPERIENCE.",
      image: "/api/placeholder/400/300",
      status: "COMPLETED",
      timeAgo: "PUBLISHED 3 MONTHS AGO",
      category: "dashboard"
    },
    {
      id: "project-2", 
      title: "THE PROJECT NAME",
      subtitle: "GYM WEBSITE",
      description: "DESIGNED A VIRTUAL GYM WEBSITE STRIVING HEALTH CONVENIENCE, DELIVERING QUALITY AND AUTHENTIC EXPERIENCE VALUE SOLUTIONS TOWARDS A FLOURISHING LIFESTYLE.",
      image: "/api/placeholder/400/300",
      status: "COMPLETED",
      timeAgo: "PUBLISHED 3 MONTHS AGO", 
      category: "website"
    },
    {
      id: "project-3",
      title: "THE PROJECT NAME", 
      subtitle: "DRONE MARKETPLACE",
      description: "CONNECT BUYERS THROUGHOUT A TAILOR'S DESIGN & CUTTING EDGE CUTTING EXPERIENCE WERE LANDSCAPE.",
      image: "/api/placeholder/400/300",
      status: "COMPLETED",
      timeAgo: "PUBLISHED 5 MONTHS AGO",
      category: "marketplace"
    }
  ];

  return (
    <section id="projects" className="min-h-screen bg-black/95 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollTriggerWrapper animation="slideUp" duration={1}>
          <div className="text-center mb-16">
            <motion.h2 
              className="font-gothic text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CREATIONS
            </motion.h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          </div>
        </ScrollTriggerWrapper>

        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-1">
            {["grid", "expanded"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as "grid" | "expanded")}
                className={`px-6 py-2 text-sm font-gaming font-bold transition-all ${
                  viewMode === mode
                    ? "bg-red-600 text-white"
                    : "text-red-400 hover:text-white"
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {viewMode === "grid" ? (
          <ScrollTriggerWrapper animation="fadeIn" duration={1.2} stagger={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative bg-red-900/10 border border-red-600/30 rounded-lg overflow-hidden hover:bg-red-900/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => {
                    setSelectedProject(project);
                    setViewMode("expanded");
                  }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-red-600/20 border border-red-600/50 px-3 py-1 rounded">
                      <span className="text-red-400 text-xs font-gaming font-bold">
                        {project.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Project Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-red-900/20 to-black border-b border-red-600/20 flex items-center justify-center">
                    <div className="text-red-400/50 text-6xl">
                      {project.category === "dashboard" && "📊"}
                      {project.category === "website" && "💻"}
                      {project.category === "marketplace" && "🛒"}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-red-400 font-gaming font-bold text-sm mb-1">
                        {project.title}
                      </h3>
                      <h4 className="text-white font-gaming text-lg font-bold mb-2">
                        {project.subtitle}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* View Live Button */}
                    <motion.button
                      className="w-full bg-red-600/20 border border-red-600/50 py-3 text-red-400 font-gaming font-bold text-sm hover:bg-red-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      VIEW LIVE
                    </motion.button>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </ScrollTriggerWrapper>
        ) : (
          /* Expanded View */
          <ScrollTriggerWrapper animation="slideUp" duration={1}>
            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-red-900/10 border border-red-600/30 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto bg-gradient-to-br from-red-900/20 to-black flex items-center justify-center">
                      <div className="text-red-400/50 text-8xl">
                        {project.category === "dashboard" && "📊"}
                        {project.category === "website" && "💻"} 
                        {project.category === "marketplace" && "🛒"}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <div className="text-red-400 text-xs font-gaming font-bold mb-2">
                          {project.timeAgo}
                        </div>
                        <h3 className="text-red-400 font-gaming font-bold text-lg mb-2">
                          {project.title}
                        </h3>
                        <h4 className="text-white font-gaming text-2xl font-bold mb-4">
                          {project.subtitle}
                        </h4>
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex space-x-4">
                        <motion.button
                          className="flex-1 bg-red-600 text-white py-3 px-6 font-gaming font-bold hover:bg-red-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          VIEW LIVE
                        </motion.button>
                        <motion.button
                          className="flex-1 bg-transparent border border-red-600/50 text-red-400 py-3 px-6 font-gaming font-bold hover:bg-red-600/20 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          VIEW CODE
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollTriggerWrapper>
        )}
      </div>
    </section>
  );
}