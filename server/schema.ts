import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const morningEntries = pgTable("morning_entries", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  identity: text("identity"),
  feeling: text("feeling"),
  action: text("action"),
  replace: text("replace"),
  whyTodayMatters: text("why_today_matters"),
  starterActionSuggestionUsed: boolean("starter_action_suggestion_used").default(false),
  drankWater: boolean("drank_water").default(false),
  exposedToLight: boolean("exposed_to_light").default(false),
  movedBody: boolean("moved_body").default(false),
  timerCompleted: boolean("timer_completed").default(false),
  visualizationCompleted: boolean("visualization_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reflections = pgTable("reflections", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  wellDone: text("well_done"),
  embodied: text("embodied"),
  grateful: text("grateful"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  currentStreak: integer("current_streak").default(0),
  totalCompletions: integer("total_completions").default(0),
  lastCompletionDate: text("last_completion_date"),
});

export const insertMorningEntrySchema = createInsertSchema(morningEntries).omit({
  id: true,
  createdAt: true,
});

export const insertReflectionSchema = createInsertSchema(reflections).omit({
  id: true,
  createdAt: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
});

export type MorningEntry = typeof morningEntries.$inferSelect;
export type InsertMorningEntry = z.infer<typeof insertMorningEntrySchema>;
export type Reflection = typeof reflections.$inferSelect;
export type InsertReflection = z.infer<typeof insertReflectionSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
