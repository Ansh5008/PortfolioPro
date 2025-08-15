import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/section-header";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const blogPosts = [
  {
    id: "ai-cybersecurity",
    title: "The Future of AI in Cybersecurity",
    excerpt: "Exploring how artificial intelligence is revolutionizing threat detection and response in the cybersecurity landscape...",
    date: "December 15, 2024",
    tags: ["AI", "Security"],
    delay: 0,
  },
  {
    id: "google-cloud-kms",
    title: "Google Cloud KMS: A Deep Dive",
    excerpt: "Understanding the intricacies of key management services and how to implement secure encryption strategies...",
    date: "December 10, 2024",
    tags: ["Cloud", "Security"],
    delay: 0.2,
  },
  {
    id: "agentic-ai",
    title: "Building Agentic AI Systems",
    excerpt: "A comprehensive guide to creating autonomous AI agents that can learn, adapt, and make decisions independently...",
    date: "December 5, 2024",
    tags: ["AI", "Agents"],
    delay: 0.4,
  },
];

export default function Blog() {
  const { ref, isVisible } = useScrollReveal();

  const handleViewAllPosts = () => {
    // In production, this would navigate to blog page
    console.log("View all posts clicked");
  };

  return (
    <section id="blog" className="relative py-20 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Chronicles of Code" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="glass-morphism rounded-xl overflow-hidden cursor-glow hover:bg-blood-red hover:bg-opacity-10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: post.delay }}
              whileHover={{ scale: 1.02, y: -5 }}
              data-testid={`blog-post-${post.id}`}
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <i className="fas fa-calendar text-blood-red" />
                  <span className="text-gothic-muted text-sm">{post.date}</span>
                </div>
                
                <h3 className="font-gothic text-xl font-semibold mb-3 text-blood-red glitch-text group-hover:text-white">
                  {post.title}
                </h3>
                
                <p className="text-gothic-gray mb-4 group-hover:text-white">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blood-red bg-opacity-20 text-blood-red rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    className="text-blood-red hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                    data-testid={`read-post-${post.id}`}
                  >
                    <i className="fas fa-arrow-right" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={handleViewAllPosts}
            className="glass-morphism px-8 py-4 rounded-lg cursor-glow hover:bg-blood-red hover:text-white transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-view-all-posts"
          >
            <span className="flex items-center space-x-2">
              <span className="glitch-text">View All Posts</span>
              <motion.i
                className="fas fa-arrow-right"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
