import { motion } from "framer-motion";

const socialLinks = [
  { icon: "fab fa-github", href: "https://github.com/ansh-kumar", label: "GitHub" },
  { icon: "fab fa-linkedin", href: "https://linkedin.com/in/ansh-kumar", label: "LinkedIn" },
  { icon: "fab fa-twitter", href: "https://twitter.com/anshkumar_dev", label: "Twitter" },
  { icon: "fas fa-envelope", href: "mailto:ansh.kumar@email.com", label: "Email" },
];

export default function Footer() {
  return (
    <motion.footer
      className="relative py-12 z-10 border-t border-blood-red border-opacity-30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            className="font-gothic text-2xl font-bold text-blood-red mb-4 glow-text"
            whileHover={{ scale: 1.05 }}
            data-testid="footer-logo"
          >
            Ansh Kumar
          </motion.div>
          
          <motion.p
            className="text-gothic-gray mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Crafting the future with AI, securing it with knowledge
          </motion.p>
          
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-glow text-gothic-text hover:text-blood-red transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                aria-label={link.label}
                data-testid={`social-link-${link.label.toLowerCase()}`}
              >
                <i className={`${link.icon} text-2xl`} />
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            className="text-gothic-muted text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            © 2024 Ansh Kumar. All rights reserved. | Forged in the depths of creativity
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
