import { motion } from "framer-motion";
import { useState } from "react";
import { ScrollTriggerWrapper } from "@/components/effects/scroll-trigger";

export default function GamingContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollTriggerWrapper animation="slideUp" duration={1}>
          <div className="text-center mb-16">
            <motion.h2 
              className="font-gothic text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              OPEN FOR HIRE
            </motion.h2>
            <div className="text-violet-primary text-sm font-gaming mb-8">
              I WOULD LOVE TO HEAR ABOUT YOUR PROJECTS!
            </div>
            <div className="w-24 h-1 bg-violet-primary mx-auto mb-8"></div>
          </div>
        </ScrollTriggerWrapper>

        <ScrollTriggerWrapper animation="fadeIn" duration={1.2}>
          <div className="bg-violet-dark/10 border border-violet-primary/30 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-violet-primary font-gaming font-bold text-sm mb-3">
                  HOW SHOULD I CALL YOU?
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-violet-primary/30 rounded px-4 py-3 text-white focus:border-violet-primary focus:outline-none transition-colors font-gaming"
                  placeholder="YOUR NAME"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-violet-primary font-gaming font-bold text-sm mb-3">
                  REACHING FROM
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-violet-primary/30 rounded px-4 py-3 text-white focus:border-violet-primary focus:outline-none transition-colors font-gaming"
                  placeholder="your.name@email.com"
                  whileFocus={{ scale: 1.01 }}
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-violet-primary font-gaming font-bold text-sm mb-3">
                  TRANSMITTED DATA
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-black border border-red-600/30 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors font-gaming resize-none"
                  placeholder="Hi, I WOULD TO KNOW ABOUT..."
                  whileFocus={{ scale: 1.01 }}
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <motion.button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-4 px-8 font-gaming font-bold hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEND MESSAGE [ENTER]
                </motion.button>
                <motion.button
                  type="button"
                  className="flex-1 border border-red-600/50 text-red-400 py-4 px-8 font-gaming font-bold hover:bg-red-600/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ name: "", email: "", message: "" })}
                >
                  DISCARD [ESC]
                </motion.button>
              </div>
            </form>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-red-600/30">
              <div className="text-center">
                <div className="text-red-400 font-gaming font-bold text-sm mb-6">
                  ALTERNATIVE CONTACT METHODS
                </div>
                <div className="flex justify-center space-x-8">
                  {[
                    { name: "EMAIL", value: "contact@jaymalone.dev", icon: "📧" },
                    { name: "LINKEDIN", value: "/in/jay-malone", icon: "💼" },
                    { name: "GITHUB", value: "/jaymalone", icon: "🔗" },
                    { name: "DISCORD", value: "JayMalone#1337", icon: "🎮" }
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.name}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="text-2xl mb-2">{contact.icon}</div>
                      <div className="text-red-400 font-gaming text-xs font-bold mb-1">
                        {contact.name}
                      </div>
                      <motion.div
                        className="text-white text-xs hover:text-red-400 cursor-pointer transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        {contact.value}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-green-600/20 border border-green-600/50 px-4 py-2 rounded">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-gaming text-xs font-bold">
                  ONLINE - AVAILABLE FOR PROJECTS
                </span>
              </div>
            </div>
          </div>
        </ScrollTriggerWrapper>
      </div>
    </section>
  );
}