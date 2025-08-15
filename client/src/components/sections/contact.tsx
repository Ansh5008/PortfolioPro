import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import SectionHeader from "@/components/ui/section-header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const contactInfo = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "ansh.kumar@email.com",
    href: "mailto:ansh.kumar@email.com",
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "github.com/ansh-kumar",
    href: "https://github.com/ansh-kumar",
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/ansh-kumar",
    href: "https://linkedin.com/in/ansh-kumar",
  },
  {
    icon: "fab fa-twitter",
    label: "Twitter",
    value: "@anshkumar_dev",
    href: "https://twitter.com/anshkumar_dev",
  },
];

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    submitContactMutation.mutate(data);
  };

  return (
    <section id="contact" className="relative py-20 z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Summon the Developer" />
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-morphism p-8 rounded-xl">
              <h3 className="font-gothic text-2xl font-semibold mb-6 text-blood-red">
                Send a Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.i
                    className="fas fa-check-circle text-6xl text-blood-red mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <h4 className="text-xl font-semibold text-blood-red mb-2">Message Sent!</h4>
                  <p className="text-gothic-gray">Thank you for reaching out. I'll get back to you soon.</p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-blood-red hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Honeypot field */}
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gothic-gray">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your name"
                              className="bg-gothic-dark border-blood-red border-opacity-30 focus:border-blood-red text-gothic-text"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gothic-gray">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your@email.com"
                              className="bg-gothic-dark border-blood-red border-opacity-30 focus:border-blood-red text-gothic-text"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gothic-gray">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell me about your project..."
                              rows={5}
                              className="bg-gothic-dark border-blood-red border-opacity-30 focus:border-blood-red text-gothic-text resize-none"
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={submitContactMutation.isPending}
                        className="w-full bg-blood-red hover:bg-deep-red text-white py-3 rounded-lg transition-all duration-300 group"
                        data-testid="button-send-message"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          {submitContactMutation.isPending ? (
                            <>
                              <motion.i
                                className="fas fa-spinner"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span className="glitch-text">Send Message</span>
                              <motion.i
                                className="fas fa-paper-plane"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              />
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : "_self"}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-morphism p-6 rounded-xl cursor-glow hover:bg-blood-red hover:bg-opacity-10 transition-all duration-300 block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  data-testid={`contact-info-${info.label.toLowerCase()}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blood-red bg-opacity-20 rounded-lg flex items-center justify-center">
                      <i className={`${info.icon} text-blood-red text-xl`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blood-red">{info.label}</h4>
                      <p className="text-gothic-gray">{info.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
