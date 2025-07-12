import { morningEntries, reflections, userStats, type MorningEntry, type Reflection, type UserStats, type InsertMorningEntry, type InsertReflection, type InsertUserStats } from "@shared/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // Morning entries
  createMorningEntry(entry: InsertMorningEntry): Promise<MorningEntry>;
  getMorningEntryByDate(date: string): Promise<MorningEntry | undefined>;
  getAllMorningEntries(): Promise<MorningEntry[]>;
  
  // Reflections
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  getReflectionsByDateRange(startDate: string, endDate: string): Promise<Reflection[]>;
  getAllReflections(): Promise<Reflection[]>;
  
  // User stats
  getUserStats(): Promise<UserStats | undefined>;
  updateUserStats(stats: Partial<UserStats>): Promise<UserStats>;
}

export class MemStorage implements IStorage {
  private morningEntries: Map<number, MorningEntry>;
  private reflections: Map<number, Reflection>;
  private userStats: UserStats | undefined;
  private currentMorningId: number;
  private currentReflectionId: number;

  constructor() {
    this.morningEntries = new Map();
    this.reflections = new Map();
    this.currentMorningId = 1;
    this.currentReflectionId = 1;
    this.userStats = {
      id: 1,
      currentStreak: 0,
      totalCompletions: 0,
      lastCompletionDate: null,
    };
  }

  async createMorningEntry(insertEntry: InsertMorningEntry): Promise<MorningEntry> {
    const id = this.currentMorningId++;
    const entry: MorningEntry = {
      id,
      date: insertEntry.date,
      identity: insertEntry.identity || null,
      feeling: insertEntry.feeling || null,
      action: insertEntry.action || null,
      replace: insertEntry.replace || null,
      whyTodayMatters: insertEntry.whyTodayMatters || null,
      starterActionSuggestionUsed: insertEntry.starterActionSuggestionUsed || false,
      drankWater: insertEntry.drankWater || false,
      exposedToLight: insertEntry.exposedToLight || false,
      movedBody: insertEntry.movedBody || false,
      timerCompleted: insertEntry.timerCompleted || false,
      visualizationCompleted: insertEntry.visualizationCompleted || false,
      createdAt: new Date(),
    };
    this.morningEntries.set(id, entry);
    return entry;
  }

  async getMorningEntryByDate(date: string): Promise<MorningEntry | undefined> {
    return Array.from(this.morningEntries.values()).find(entry => entry.date === date);
  }

  async getAllMorningEntries(): Promise<MorningEntry[]> {
    return Array.from(this.morningEntries.values());
  }

  async createReflection(insertReflection: InsertReflection): Promise<Reflection> {
    const id = this.currentReflectionId++;
    const reflection: Reflection = {
      id,
      date: insertReflection.date,
      wellDone: insertReflection.wellDone || null,
      embodied: insertReflection.embodied || null,
      grateful: insertReflection.grateful || null,
      createdAt: new Date(),
    };
    this.reflections.set(id, reflection);
    return reflection;
  }

  async getReflectionsByDateRange(startDate: string, endDate: string): Promise<Reflection[]> {
    return Array.from(this.reflections.values()).filter(reflection => {
      return reflection.date >= startDate && reflection.date <= endDate;
    });
  }

  async getAllReflections(): Promise<Reflection[]> {
    return Array.from(this.reflections.values());
  }

  async getUserStats(): Promise<UserStats | undefined> {
    return this.userStats;
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    this.userStats = { ...this.userStats!, ...stats };
    return this.userStats;
  }
}

// DatabaseStorage class commented out for now (database connection issues)
/*
export class DatabaseStorage implements IStorage {
  async createMorningEntry(insertEntry: InsertMorningEntry): Promise<MorningEntry> {
    const [entry] = await db
      .insert(morningEntries)
      .values(insertEntry)
      .returning();
    return entry;
  }

  async getMorningEntryByDate(date: string): Promise<MorningEntry | undefined> {
    const [entry] = await db
      .select()
      .from(morningEntries)
      .where(eq(morningEntries.date, date));
    return entry || undefined;
  }

  async getAllMorningEntries(): Promise<MorningEntry[]> {
    return await db.select().from(morningEntries);
  }

  async createReflection(insertReflection: InsertReflection): Promise<Reflection> {
    const [reflection] = await db
      .insert(reflections)
      .values(insertReflection)
      .returning();
    return reflection;
  }

  async getReflectionsByDateRange(startDate: string, endDate: string): Promise<Reflection[]> {
    return await db
      .select()
      .from(reflections)
      .where(and(gte(reflections.date, startDate), lte(reflections.date, endDate)));
  }

  async getAllReflections(): Promise<Reflection[]> {
    return await db.select().from(reflections);
  }

  async getUserStats(): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats);
    if (!stats) {
      // Create default stats if none exist
      const [newStats] = await db
        .insert(userStats)
        .values({
          currentStreak: 0,
          totalCompletions: 0,
          lastCompletionDate: null,
        })
        .returning();
      return newStats;
    }
    return stats;
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    const existingStats = await this.getUserStats();
    if (!existingStats) {
      throw new Error("User stats not found");
    }
    
    const [updatedStats] = await db
      .update(userStats)
      .set(stats)
      .where(eq(userStats.id, existingStats.id))
      .returning();
    return updatedStats;
  }
}
*/

// Use in-memory storage for now (database connection issues)
export const storage = new MemStorage();
