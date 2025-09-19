import express, { type Request, Response } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPresaleTransactionSchema, insertProofSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: express.Application) {
  // API Routes
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/presale/prices", async (req: Request, res: Response) => {
    try {
      // Fetch live MATIC/USD price from CoinGecko
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd&include_last_updated_at=true'
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();
      const maticUsd = data['matic-network']?.usd;

      if (!maticUsd) {
        throw new Error('MATIC price not found in response');
      }

      res.json({
        maticUsd: maticUsd,
        vfyzUsd: 0.05, // Fixed VFYZ price during presale
        presaleActive: true,
        presalePhase: 1,
        totalRaised: 0,
        maxCap: 1000000,
        updated: new Date().toISOString(),
        source: 'coingecko'
      });
    } catch (error) {
      console.error('Price feed error:', error);
      // Fallback to mock prices if API fails
      res.json({
        maticUsd: 0.85, // Fallback price
        vfyzUsd: 0.05,
        presaleActive: true,
        presalePhase: 1,
        totalRaised: 0,
        maxCap: 1000000,
        updated: new Date().toISOString(),
        source: 'fallback',
        error: 'Live price feed unavailable'
      });
    }
  });

  app.get("/api/presale/stats", (req: Request, res: Response) => {
    res.json({
      totalParticipants: 0,
      tokensDistributed: 0,
      currentPhase: 1,
      nextPhaseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists by username or wallet address
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }

      if (userData.walletAddress) {
        const existingUserByWallet = await storage.getUserByWalletAddress(userData.walletAddress);
        if (existingUserByWallet) {
          return res.status(400).json({ message: "Wallet address already registered" });
        }
      }

      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users/wallet/:walletAddress", async (req, res) => {
    try {
      const user = await storage.getUserByWalletAddress(req.params.walletAddress);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Presale routes
  app.post("/api/presale/transactions", async (req, res) => {
    try {
      const transactionData = insertPresaleTransactionSchema.parse(req.body);
      const transaction = await storage.createPresaleTransaction(transactionData);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data", error });
    }
  });

  app.get("/api/presale/transactions/wallet/:walletAddress", async (req, res) => {
    try {
      const transactions = await storage.getPresaleTransactionsByWallet(req.params.walletAddress);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/presale/transactions/:id", async (req, res) => {
    try {
      const updates = insertPresaleTransactionSchema.partial().parse(req.body);
      const transaction = await storage.updatePresaleTransaction(req.params.id, updates);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  // Proof submission routes
  app.post("/api/proof/submissions", async (req, res) => {
    try {
      const submissionData = insertProofSubmissionSchema.parse(req.body);
      const submission = await storage.createProofSubmission(submissionData);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ message: "Invalid submission data", error });
    }
  });

  app.get("/api/proof/submissions/wallet/:walletAddress", async (req, res) => {
    try {
      const submissions = await storage.getProofSubmissionsByWallet(req.params.walletAddress);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/proof/submissions/:id", async (req, res) => {
    try {
      const updates = insertProofSubmissionSchema.partial().parse(req.body);
      const submission = await storage.updateProofSubmission(req.params.id, updates);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      res.json(submission);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data", error });
    }
  });

  

  const server = createServer(app);
  return server;
}