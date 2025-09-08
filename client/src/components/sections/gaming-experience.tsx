import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";

interface Skill {
  name: string;
  level: number;
  description: string;
  icon: string;
  inProgress?: boolean;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  status: "completed" | "current";
}

export default function GamingExperience() {
  const [activeTab, setActiveTab] = useState<"skills" | "progress" | "experience">("skills");

  const skills: Skill[] = [
    {
      name: "UI UX DESIGNING",
      level: 70,
      description: "USER EXPERIENCE, WIREFRAME DESIGN, RAPID BUILDING, USER INTERFACE RESEARCH USABILITY",
      icon: "🎨"
    },
    {
      name: "PROTOTYPING", 
      level: 85,
      description: "PROTOTYPING AND ANIMATION.",
      icon: "⚡"
    },
    {
      name: "VIDEO EDITING",
      level: 60,
      description: "ADOBE AFTER EFFECTS, ANIMATION, AND POST-EDITING UNSTRUCTURED VISION.",
      icon: "🎬"
    },
    {
      name: "CONTENT CREATION",
      level: 91,
      description: "CUSTOMIZING CONTENT, REFERENCE, ORIGINALITY, TONE",
      icon: "📝"
    },
    {
      name: "MOTION DESIGN",
      level: 75,
      description: "ADVANCED FOCUS BOTH ANIMATION & DESIGN TECHNIQUE & USER CONTROL CONTENT OF CONTEXT.",
      icon: "🎭",
      inProgress: true
    }
  ];

  const experiences: Experience[] = [
    {
      title: "ACADEMIC ODYSSEY",
      company: "RESEARCH FACILITY, PLANET X-17",
      period: "2019",
      description: "PROJECT STATUS: COMPLETED",
      status: "completed"
    },
    {
      title: "MECHANICAL ENGINEERING (DIPLOMA)",
      company: "GUJARAT TECHNOLOGICAL UNIVERSITY, AHMEDABAD",
      period: "2018",
      description: "PROJECT STATUS: COMPLETED",
      status: "completed"
    },
    {
      title: "MECHANICAL ENGINEERING (BACHELOR)",
      company: "GUJARAT TECHNOLOGICAL UNIVERSITY, AHMEDABAD", 
      period: "2015",
      description: "PROJECT STATUS: COMPLETED",
      status: "completed"
    }
  ];

  const progressData = [
    { skill: "DESIGNING", level: 92, year: 2 },
    { skill: "VIDEO EDITING", level: 85, year: 3.5 },
    { skill: "CONTENT CREATION", level: 91, year: 5.1 }
  ];

  return (
    <section id="experience" className="min-h-screen bg-gradient-to-b from-black to-red-900/10 py-20 px-6">
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
              {activeTab === "skills" ? "CRAFTSMANSHIPS" : activeTab === "progress" ? "PROGRESS" : "DATA LOG DUMP INITIALIZED"}
            </motion.h2>
            <div className="text-red-400 text-sm font-gaming mb-8">
              {activeTab === "skills" ? "EXPERIENCE IN EACH SKILL" : activeTab === "progress" ? "EXPERIENCE IN EACH SKILL" : ""}
            </div>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          </div>
        </ScrollTriggerWrapper>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-1">
            {[
              { key: "skills", label: "CRAFTSMANSHIPS", active: activeTab === "skills" },
              { key: "progress", label: "PROGRESS", active: activeTab === "progress" }, 
              { key: "experience", label: "LOGS", active: activeTab === "experience" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 text-sm font-gaming font-bold transition-all ${
                  tab.active
                    ? "bg-red-600 text-white"
                    : "text-red-400 hover:text-white hover:bg-red-600/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <ScrollTriggerWrapper animation="fadeIn" duration={1} key={activeTab}>
          {activeTab === "skills" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skills List */}
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="bg-red-900/10 border border-red-600/30 rounded-lg p-6 hover:bg-red-900/20 transition-all"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{skill.icon}</div>
                        <div>
                          <h3 className="text-red-400 font-gaming font-bold text-lg">
                            {skill.name}
                          </h3>
                          {skill.inProgress && (
                            <div className="text-green-400 text-xs font-gaming">
                              IN PIPELINE
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-2xl font-bold">
                          {skill.level}%
                        </div>
                        <div className="text-red-400 text-xs">PROGRESS</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-red-900/30 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {skill.description}
                    </p>

                    {skill.inProgress && (
                      <motion.button
                        className="mt-4 bg-red-600/20 border border-red-600/50 px-4 py-2 text-red-400 font-gaming text-xs font-bold hover:bg-red-600/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        CHALLENGE ME
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Challenge Me Section */}
              <div className="space-y-6">
                <div className="bg-red-900/10 border border-red-600/30 rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-white text-3xl font-bold">70%</div>
                  </div>
                  <div className="text-red-400 font-gaming font-bold mb-2">PROGRESS</div>
                  <p className="text-gray-300 text-sm mb-6">
                    I HAVE CERTIFIED & SET OF ACADEMIC FOCUSED
                    ON BUILDING REAL-WORLD PROJECTS, THAT WILL
                    SHAPE MY ONGOING PROJECTS.
                  </p>
                  <p className="text-gray-300 text-sm mb-6">
                    IF YOU WANT TO GIVE ME A CHALLENGE THAT MIGHT
                    ADVANCE THE SKILLS I COMMIT TO SOLVING IT
                    WITH MY ONGOING PROJECTS.
                  </p>
                  <motion.button
                    className="bg-red-600 text-white px-8 py-3 font-gaming font-bold hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    CHALLENGE ME
                  </motion.button>
                </div>

                <div className="text-center">
                  <div className="text-red-400 font-gaming text-sm mb-2">IN PIPELINE</div>
                  <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <div className="text-green-400 font-gaming font-bold">MOTION DESIGN</div>
                        <div className="text-white text-sm">ADVANCED FOCUS BOTH ANIMATION & DESIGN TECHNIQUE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-900/10 border border-red-600/30 rounded-lg p-8">
                <h3 className="text-white font-gaming text-2xl font-bold mb-8 text-center">
                  PROGRESS
                  <div className="text-red-400 text-sm font-normal">EXPERIENCE IN EACH SKILL</div>
                </h3>
                
                <div className="space-y-8">
                  {progressData.map((item, index) => (
                    <motion.div
                      key={item.skill}
                      className="space-y-4"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-red-400 font-gaming font-bold text-lg">
                          {item.skill}
                        </div>
                        <div className="text-white">
                          YEARS <span className="text-red-400">{item.year}</span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-black h-8 border border-red-600/30 rounded">
                          <motion.div
                            className="bg-red-600 h-full rounded flex items-center justify-end pr-4"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          >
                            <span className="text-white font-gaming font-bold text-sm">
                              {item.level}%
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <div className="bg-red-600/20 border border-red-600/50 rounded p-6">
                    <div className="text-red-400 text-sm font-gaming mb-2">
                      ⚠ THE CONSEQUENCE DATA IS STORED IN YOUR BROWSER. IF YOU LOAD FROM A DIFFERENT
                      BROWSER OR INCOGNITO, YOUR STATISTICS WILL NOT APPEAR.
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                      <motion.button
                        className="bg-red-600 text-white px-6 py-2 font-gaming text-sm font-bold hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        WRITE TO DISK [ENTER]
                      </motion.button>
                      <motion.button
                        className="border border-red-600/50 text-red-400 px-6 py-2 font-gaming text-sm font-bold hover:bg-red-600/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        DISCARD [ESC]
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="text-red-400 font-gaming text-sm mb-4">
                  LOG ENTRY: ACADEMIC ODYSSEY
                  <div className="text-white">LOCATION: RESEARCH FACILITY, PLANET X-17</div>
                  <div className="text-white">PROJECT STATUS: COMPLETED</div>
                </div>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="bg-red-900/10 border border-red-600/30 rounded p-6 hover:bg-red-900/20 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="bg-red-600 text-white px-3 py-1 text-xs font-gaming font-bold">
                            LOG ENTRY:
                          </div>
                          <div className="text-red-400 font-gaming font-bold">
                            {exp.title}
                          </div>
                        </div>
                        <div className="text-white mb-1">{exp.company}</div>
                        <div className="text-gray-400 text-sm">{exp.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-400 font-gaming text-sm">DATE: {exp.period}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  className="bg-red-600/20 border border-red-600/50 text-red-400 px-6 py-3 font-gaming font-bold hover:bg-red-600/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  AUXILIARY ACADEMICS ⚙
                </motion.button>
              </div>
            </div>
          )}
        </ScrollTriggerWrapper>
      </div>
    </section>
  );
}