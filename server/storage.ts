import { 
  type User, 
  type InsertUser, 
  type PresaleTransaction, 
  type InsertPresaleTransaction,
  type ProofSubmission,
  type InsertProofSubmission
} from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private presaleTransactions: Map<string, PresaleTransaction>;
  private proofSubmissions: Map<string, ProofSubmission>;

  constructor() {
    this.users = new Map();
    this.presaleTransactions = new Map();
    this.proofSubmissions = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      walletAddress: insertUser.walletAddress ?? null,
      email: insertUser.email ?? null,
      isNotificationEnabled: insertUser.isNotificationEnabled ?? false,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Presale operations
  async createPresaleTransaction(insertTransaction: InsertPresaleTransaction): Promise<PresaleTransaction> {
    const id = randomUUID();
    const transaction: PresaleTransaction = {
      ...insertTransaction,
      userId: insertTransaction.userId ?? null,
      transactionHash: insertTransaction.transactionHash ?? null,
      status: insertTransaction.status ?? "pending",
      id,
      createdAt: new Date()
    };
    this.presaleTransactions.set(id, transaction);
    return transaction;
  }

  async getPresaleTransactionsByUser(userId: string): Promise<PresaleTransaction[]> {
    return Array.from(this.presaleTransactions.values()).filter(
      (transaction) => transaction.userId === userId,
    );
  }

  async getPresaleTransactionsByWallet(walletAddress: string): Promise<PresaleTransaction[]> {
    return Array.from(this.presaleTransactions.values()).filter(
      (transaction) => transaction.walletAddress === walletAddress,
    );
  }

  async updatePresaleTransaction(id: string, updates: Partial<InsertPresaleTransaction>): Promise<PresaleTransaction | undefined> {
    const transaction = this.presaleTransactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction = { ...transaction, ...updates };
    this.presaleTransactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  // Proof submission operations
  async createProofSubmission(insertSubmission: InsertProofSubmission): Promise<ProofSubmission> {
    const id = randomUUID();
    const submission: ProofSubmission = {
      ...insertSubmission,
      userId: insertSubmission.userId ?? null,
      gpsCoordinates: insertSubmission.gpsCoordinates ?? null,
      deviceSignature: insertSubmission.deviceSignature ?? null,
      verificationStatus: insertSubmission.verificationStatus ?? "pending",
      rewardAmount: insertSubmission.rewardAmount ?? null,
      id,
      submittedAt: new Date()
    };
    this.proofSubmissions.set(id, submission);
    return submission;
  }

  async getProofSubmissionsByUser(userId: string): Promise<ProofSubmission[]> {
    return Array.from(this.proofSubmissions.values()).filter(
      (submission) => submission.userId === userId,
    );
  }

  async getProofSubmissionsByWallet(walletAddress: string): Promise<ProofSubmission[]> {
    return Array.from(this.proofSubmissions.values()).filter(
      (submission) => submission.walletAddress === walletAddress,
    );
  }

  async updateProofSubmission(id: string, updates: Partial<InsertProofSubmission>): Promise<ProofSubmission | undefined> {
    const submission = this.proofSubmissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission = { ...submission, ...updates };
    this.proofSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
}

export const storage = new MemStorage();
