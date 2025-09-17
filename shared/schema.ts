
import { sql } from "drizzle-orm";
import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().default(sql`(lower(hex(randomblob(16))))`),
  username: text("username").notNull().unique(),
  walletAddress: text("wallet_address"),
  email: text("email"),
  isNotificationEnabled: integer("is_notification_enabled", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const presaleTransactions = sqliteTable("presale_transactions", {
  id: text("id").primaryKey().default(sql`(lower(hex(randomblob(16))))`),
  userId: text("user_id").references(() => users.id),
  walletAddress: text("wallet_address").notNull(),
  usdAmount: real("usd_amount").notNull(),
  vfyzTokens: real("vfyz_tokens").notNull(),
  transactionHash: text("transaction_hash"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const proofSubmissions = sqliteTable("proof_submissions", {
  id: text("id").primaryKey().default(sql`(lower(hex(randomblob(16))))`),
  userId: text("user_id").references(() => users.id),
  walletAddress: text("wallet_address").notNull(),
  eventName: text("event_name").notNull(),
  location: text("location").notNull(),
  gpsCoordinates: text("gps_coordinates"),
  deviceSignature: text("device_signature"),
  verificationStatus: text("verification_status").default("pending"), // pending, verified, rejected
  rewardAmount: real("reward_amount"),
  submittedAt: integer("submitted_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
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
