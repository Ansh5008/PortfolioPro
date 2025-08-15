import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Check honeypot field for spam protection
      if (validatedData.honeypot && validatedData.honeypot.trim() !== "") {
        // This is likely spam, silently reject
        return res.status(200).json({ message: "Message sent successfully" });
      }
      
      // Create contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // In production, you would send an email here
      console.log("New contact submission:", {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        message: submission.message,
        createdAt: submission.createdAt,
      });
      
      res.status(200).json({ 
        message: "Message sent successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({
        message: "Failed to send message. Please try again later.",
      });
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        message: "Failed to fetch contact submissions",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
