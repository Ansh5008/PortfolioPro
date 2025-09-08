import { motion } from "framer-motion";
import { useState } from "react";
import { scrollTo } from "@/hooks/use-lenis";

interface SidebarProps {
  className?: string;
}

export default function GamingSidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userInfo = {
    name: "JAY MALONE",
    level: "07",
    coinsEarned: "6,197",
    credits: "CREDITS",
    serviceTime: "9.46",
    currentTime: "49.30"
  };

  const navigationItems = [
    { id: "home", label: "BEGINNING", icon: "▲" },
    { id: "about", label: "LOGS", icon: "◉" },
    { id: "projects", label: "CRAFTSMANSHIPS", icon: "◈" },
    { id: "experience", label: "CREATIONS", icon: "◆" },
    { id: "contact", label: "ABOUT ME", icon: "●", highlight: true }
  ];

  const stats = [
    { label: "AVAILABILITY", value: "LIVE FOR HIRE", active: true },
    { label: "OCCUPATION", value: "UI UX DESIGNER" },
    { label: "CORPORATION", value: "FREELANCING" },
    { label: "SOCIAL", value: "OPEN CONNECTION", link: true }
  ];

  const handleNavClick = (id: string) => {
    scrollTo(`#${id}`, { duration: 1.5, offset: -80 });
  };

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-black/90 backdrop-blur-md border-r border-red-600/30 z-40 ${className}`}
      initial={{ x: -300 }}
      animate={{ x: isCollapsed ? -220 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-64 h-full p-6 text-red-400 font-gaming">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">{userInfo.level}</span>
            </div>
            <span className="text-green-400 text-sm font-bold">LEVEL</span>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xs">+</span>
              <span className="text-white font-bold">{userInfo.coinsEarned}</span>
              <span className="text-gray-400 text-xs">COINS UNLOCKED</span>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="border border-red-600/30 rounded-lg p-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center">
              <span className="text-red-400 text-xs">👤</span>
            </div>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="text-red-400 font-bold">NAME</div>
            <div className="text-white font-bold text-sm">{userInfo.name}</div>
            
            <div className="text-red-400 font-bold mt-3">OCCUPATION</div>
            <div className="text-white text-sm">UI UX DESIGNER</div>
            
            <div className="text-red-400 font-bold mt-3">CORPORATION</div>
            <div className="text-white text-sm">FREELANCING</div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-xs ${stat.active ? 'text-red-400' : 'text-gray-400'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-red-400 font-bold">{stat.label}</div>
              <div className={`${stat.active ? 'text-white' : 'text-gray-300'} ${stat.link ? 'border-b border-red-600/50 cursor-pointer hover:text-red-400' : ''}`}>
                {stat.value} {stat.link && <span className="text-red-600">›</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Status */}
        <div className="text-xs mb-8">
          <div className="text-red-400 font-bold">SOCIAL</div>
          <div className="text-white border-b border-red-600/50 cursor-pointer hover:text-red-400 pb-1">
            OPEN CONNECTION <span className="text-red-600">›</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between border-t border-red-600/30 pt-4">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-bold px-2 py-1 transition-all duration-300 ${
                  item.highlight
                    ? 'bg-red-600 text-white border border-red-600'
                    : 'text-red-400 hover:text-white hover:bg-red-600/20 border border-red-600/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Collapse Toggle */}
      <motion.button
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-red-600 rounded-r-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
          ◀
        </span>
      </motion.button>
    </motion.div>
  );
}