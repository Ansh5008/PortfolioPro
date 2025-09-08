import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { scrollTo } from "@/hooks/use-lenis";

interface GamingHeaderProps {
  className?: string;
}

export default function GamingHeader({ className = "" }: GamingHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = {
    credits: "CREDITS",
    serviceTime: "9.46",
    currentTime: "49.30"
  };

  const questInfo = {
    title: "ACTIVE QUEST",
    status: "IN PROGRESS",
    name: "QUEST NAME",
    detail: "OUTSTANDING OBJECTIVES",
    mission: "MISSION",
    description: "TO DELIVER THE EXPERIENCE",
    rewards: "REWARDS"
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-violet-primary/30 ${className}`}
      style={{ opacity: headerOpacity }}
    >
      <div className="flex items-center justify-between px-6 py-3 font-gaming text-sm">
        {/* Left Section - Stats */}
        <div className="flex items-center space-x-8">
          <div className="text-violet-primary">
            {stats.credits} <span className="text-white">SERVICE TIME: {stats.serviceTime}</span>
          </div>
          <div className="text-violet-primary">
            <span className="text-gray-400">CURRENT TIME:</span> <span className="text-white">{stats.currentTime}</span>
          </div>
        </div>

        {/* Right Section - Quest Info */}
        <div className="flex items-center space-x-6">
          <div className="bg-violet-primary/20 border border-violet-primary/50 px-4 py-2 rounded">
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-violet-primary text-xs font-bold">{questInfo.title}</div>
                <div className="text-white text-xs">{questInfo.status}</div>
              </div>
              <div className="border-l border-violet-primary/30 pl-4">
                <div className="text-violet-primary text-xs">{questInfo.name}</div>
                <div className="text-white text-xs">{questInfo.detail}</div>
              </div>
              <div className="border-l border-violet-primary/30 pl-4">
                <div className="text-violet-primary text-xs">{questInfo.mission}</div>
                <div className="text-white text-xs max-w-32 truncate">{questInfo.description}</div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <motion.button
              className="bg-violet-primary/20 border border-violet-primary/50 px-3 py-1 text-xs text-violet-primary hover:bg-violet-primary/30 transition-colors rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SOUND EFFECTS ✓
            </motion.button>
            <motion.button
              className="bg-gray-600/20 border border-gray-600/50 px-3 py-1 text-xs text-gray-400 hover:bg-gray-600/30 transition-colors rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MUSIC
            </motion.button>
            <motion.button
              className="bg-violet-primary/20 border border-violet-primary/50 px-3 py-1 text-xs text-violet-primary hover:bg-violet-primary/30 transition-colors rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VISUAL SETTINGS ⚙
            </motion.button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-dark/30">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-primary to-violet-secondary"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </div>
    </motion.header>
  );
}