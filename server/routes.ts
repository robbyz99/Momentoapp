import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMorningEntrySchema, insertReflectionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Morning entries
  app.post("/api/morning-entries", async (req, res) => {
    try {
      const data = insertMorningEntrySchema.parse(req.body);
      const entry = await storage.createMorningEntry(data);
      res.json(entry);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.get("/api/morning-entries/date/:date", async (req, res) => {
    try {
      const entry = await storage.getMorningEntryByDate(req.params.date);
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/morning-entries", async (req, res) => {
    try {
      const entries = await storage.getAllMorningEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // Reflections
  app.post("/api/reflections", async (req, res) => {
    try {
      const data = insertReflectionSchema.parse(req.body);
      const reflection = await storage.createReflection(data);
      res.json(reflection);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.get("/api/reflections", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (startDate && endDate) {
        const reflections = await storage.getReflectionsByDateRange(
          startDate as string,
          endDate as string
        );
        res.json(reflections);
      } else {
        const reflections = await storage.getAllReflections();
        res.json(reflections);
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  // User stats
  app.get("/api/user-stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  app.put("/api/user-stats", async (req, res) => {
    try {
      const stats = await storage.updateUserStats(req.body);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
