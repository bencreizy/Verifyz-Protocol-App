import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { BlockchainService } from './blockchain.service';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Initialize blockchain service
const blockchainService = new BlockchainService();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Network endpoint - returns chain ID, network name
app.get('/api/network', async (req, res) => {
  try {
    const networkInfo = await blockchainService.getNetworkInfo();
    res.json(networkInfo);
  } catch (error) {
    console.error('Network endpoint error:', error);
    res.status(500).json({ error: 'Failed to fetch network information' });
  }
});

// Token summary endpoint - total supply, decimals, fee split
app.get('/api/token/summary', async (req, res) => {
  try {
    const tokenSummary = await blockchainService.getTokenSummary();
    res.json(tokenSummary);
  } catch (error) {
    console.error('Token summary endpoint error:', error);
    res.status(500).json({ error: 'Failed to fetch token summary' });
  }
});

// Presale status endpoint - total raised, buyers count, finalized status
app.get('/api/presale/status', async (req, res) => {
  try {
    const presaleStatus = await blockchainService.getPresaleStatus();
    res.json(presaleStatus);
  } catch (error) {
    console.error('Presale status endpoint error:', error);
    res.status(500).json({ error: 'Failed to fetch presale status' });
  }
});

// Winners endpoint - returns 5 lifetime winners
app.get('/api/winners', async (req, res) => {
  try {
    const winners = await blockchainService.getLifetimeWinners();
    res.json(winners);
  } catch (error) {
    console.error('Winners endpoint error:', error);
    res.status(500).json({ error: 'Failed to fetch lifetime winners' });
  }
});

// Rewards endpoint - returns pending rewards for given wallet
app.get('/api/rewards/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const rewards = await blockchainService.getPendingRewards(address);
    res.json(rewards);
  } catch (error: any) {
    console.error('Rewards endpoint error:', error);
    if (error.message === 'Invalid Ethereum address') {
      res.status(400).json({ error: 'Invalid Ethereum address provided' });
    } else {
      res.status(500).json({ error: 'Failed to fetch rewards information' });
    }
  }
});

// Contract deployment status endpoint (helper for development)
app.get('/api/contracts/status', async (req, res) => {
  try {
    const status = await blockchainService.checkContractsDeployed();
    res.json(status);
  } catch (error) {
    console.error('Contract status endpoint error:', error);
    res.status(500).json({ error: 'Failed to check contract deployment status' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log configuration status
  console.log('\nConfiguration Status:');
  console.log('- Polygon RPC URL:', process.env.POLYGON_RPC_URL ? '✓ Configured' : '✗ Not configured');
  console.log('- VFZ Token Address:', process.env.VFZ_TOKEN_ADDRESS ? '✓ Configured' : '✗ Not configured');
  console.log('- Presale Address:', process.env.PRESALE_ADDRESS ? '✓ Configured' : '✗ Not configured');
  console.log('- Rewards Distributor Address:', process.env.REWARDS_DISTRIBUTOR_ADDRESS ? '✓ Configured' : '✗ Not configured');
  
  console.log('\nAvailable API Endpoints:');
  console.log('- GET /health - Health check');
  console.log('- GET /api/network - Get network information');
  console.log('- GET /api/token/summary - Get token summary');
  console.log('- GET /api/presale/status - Get presale status');
  console.log('- GET /api/winners - Get lifetime winners');
  console.log('- GET /api/rewards/:address - Get pending rewards for address');
  console.log('- GET /api/contracts/status - Check contract deployment status');
});