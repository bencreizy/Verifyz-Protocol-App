import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  walletAddress: text("wallet_address"),
  email: text("email"),
  isNotificationEnabled: boolean("is_notification_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const presaleTransactions = pgTable("presale_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  walletAddress: text("wallet_address").notNull(),
  usdAmount: decimal("usd_amount", { precision: 10, scale: 2 }).notNull(),
  vfyzTokens: decimal("vfyz_tokens", { precision: 20, scale: 8 }).notNull(),
  transactionHash: text("transaction_hash"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const proofSubmissions = pgTable("proof_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  walletAddress: text("wallet_address").notNull(),
  eventName: text("event_name").notNull(),
  location: text("location").notNull(),
  gpsCoordinates: text("gps_coordinates"),
  deviceSignature: text("device_signature"),
  verificationStatus: text("verification_status").default("pending"), // pending, verified, rejected
  rewardAmount: decimal("reward_amount", { precision: 20, scale: 8 }),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPresaleTransactionSchema = createInsertSchema(presaleTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertProofSubmissionSchema = createInsertSchema(proofSubmissions).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPresaleTransaction = z.infer<typeof insertPresaleTransactionSchema>;
export type PresaleTransaction = typeof presaleTransactions.$inferSelect;
export type InsertProofSubmission = z.infer<typeof insertProofSubmissionSchema>;
export type ProofSubmission = typeof proofSubmissions.$inferSelect;
