import { 
  type User, 
  type InsertUser, 
  type PresaleTransaction, 
  type InsertPresaleTransaction,
  type ProofSubmission,
  type InsertProofSubmission,
  users,
  presaleTransactions,
  proofSubmissions
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Presale operations
  createPresaleTransaction(transaction: InsertPresaleTransaction): Promise<PresaleTransaction>;
  getPresaleTransactionsByUser(userId: string): Promise<PresaleTransaction[]>;
  getPresaleTransactionsByWallet(walletAddress: string): Promise<PresaleTransaction[]>;
  updatePresaleTransaction(id: string, updates: Partial<InsertPresaleTransaction>): Promise<PresaleTransaction | undefined>;
  
  // Proof submission operations
  createProofSubmission(submission: InsertProofSubmission): Promise<ProofSubmission>;
  getProofSubmissionsByUser(userId: string): Promise<ProofSubmission[]>;
  getProofSubmissionsByWallet(walletAddress: string): Promise<ProofSubmission[]>;
  updateProofSubmission(id: string, updates: Partial<InsertProofSubmission>): Promise<ProofSubmission | undefined>;
}

export class DatabaseStorage implements IStorage {

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        walletAddress: insertUser.walletAddress ?? null,
        email: insertUser.email ?? null,
        isNotificationEnabled: insertUser.isNotificationEnabled ?? false,
      })
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...updates,
        walletAddress: updates.walletAddress ?? undefined,
        email: updates.email ?? undefined,
        isNotificationEnabled: updates.isNotificationEnabled ?? undefined,
      })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Presale operations
  async createPresaleTransaction(insertTransaction: InsertPresaleTransaction): Promise<PresaleTransaction> {
    const [transaction] = await db
      .insert(presaleTransactions)
      .values({
        ...insertTransaction,
        userId: insertTransaction.userId ?? null,
        transactionHash: insertTransaction.transactionHash ?? null,
        status: insertTransaction.status ?? "pending",
      })
      .returning();
    return transaction;
  }

  async getPresaleTransactionsByUser(userId: string): Promise<PresaleTransaction[]> {
    return await db
      .select()
      .from(presaleTransactions)
      .where(eq(presaleTransactions.userId, userId));
  }

  async getPresaleTransactionsByWallet(walletAddress: string): Promise<PresaleTransaction[]> {
    return await db
      .select()
      .from(presaleTransactions)
      .where(eq(presaleTransactions.walletAddress, walletAddress));
  }

  async updatePresaleTransaction(id: string, updates: Partial<InsertPresaleTransaction>): Promise<PresaleTransaction | undefined> {
    const [transaction] = await db
      .update(presaleTransactions)
      .set({
        ...updates,
        userId: updates.userId ?? undefined,
        transactionHash: updates.transactionHash ?? undefined,
        status: updates.status ?? undefined,
      })
      .where(eq(presaleTransactions.id, id))
      .returning();
    return transaction || undefined;
  }

  // Proof submission operations
  async createProofSubmission(insertSubmission: InsertProofSubmission): Promise<ProofSubmission> {
    const [submission] = await db
      .insert(proofSubmissions)
      .values({
        ...insertSubmission,
        userId: insertSubmission.userId ?? null,
        gpsCoordinates: insertSubmission.gpsCoordinates ?? null,
        deviceSignature: insertSubmission.deviceSignature ?? null,
        verificationStatus: insertSubmission.verificationStatus ?? "pending",
        rewardAmount: insertSubmission.rewardAmount ?? null,
      })
      .returning();
    return submission;
  }

  async getProofSubmissionsByUser(userId: string): Promise<ProofSubmission[]> {
    return await db
      .select()
      .from(proofSubmissions)
      .where(eq(proofSubmissions.userId, userId));
  }

  async getProofSubmissionsByWallet(walletAddress: string): Promise<ProofSubmission[]> {
    return await db
      .select()
      .from(proofSubmissions)
      .where(eq(proofSubmissions.walletAddress, walletAddress));
  }

  async updateProofSubmission(id: string, updates: Partial<InsertProofSubmission>): Promise<ProofSubmission | undefined> {
    const [submission] = await db
      .update(proofSubmissions)
      .set({
        ...updates,
        userId: updates.userId ?? undefined,
        gpsCoordinates: updates.gpsCoordinates ?? undefined,
        deviceSignature: updates.deviceSignature ?? undefined,
        verificationStatus: updates.verificationStatus ?? undefined,
        rewardAmount: updates.rewardAmount ?? undefined,
      })
      .where(eq(proofSubmissions.id, id))
      .returning();
    return submission || undefined;
  }
}

export const storage = new DatabaseStorage();
