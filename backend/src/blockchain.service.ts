import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import VFZTokenABI from '../contracts/abi/VFZToken.json';
import PresaleABI from '../contracts/abi/Presale.json';
import RewardsDistributorABI from '../contracts/abi/RewardsDistributor.json';

dotenv.config();

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private vfzToken: ethers.Contract;
  private presale: ethers.Contract;
  private rewardsDistributor: ethers.Contract;

  constructor() {
    // Initialize provider
    const rpcUrl = process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com';
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    // Initialize contracts (addresses from environment variables)
    const vfzTokenAddress = process.env.VFZ_TOKEN_ADDRESS || '';
    const presaleAddress = process.env.PRESALE_ADDRESS || '';
    const rewardsDistributorAddress = process.env.REWARDS_DISTRIBUTOR_ADDRESS || '';

    this.vfzToken = new ethers.Contract(
      vfzTokenAddress,
      VFZTokenABI.abi,
      this.provider
    );

    this.presale = new ethers.Contract(
      presaleAddress,
      PresaleABI.abi,
      this.provider
    );

    this.rewardsDistributor = new ethers.Contract(
      rewardsDistributorAddress,
      RewardsDistributorABI.abi,
      this.provider
    );
  }

  // Network methods
  async getNetworkInfo() {
    try {
      const network = await this.provider.getNetwork();
      return {
        chainId: network.chainId.toString(),
        name: network.name || 'Polygon Mainnet'
      };
    } catch (error) {
      console.error('Error getting network info:', error);
      throw error;
    }
  }

  // Token methods
  async getTokenSummary() {
    try {
      const [totalSupply, decimals, taxPercentage, treasuryShare, rewardsShare] = await Promise.all([
        this.vfzToken.totalSupply(),
        this.vfzToken.decimals(),
        this.vfzToken.TAX_PERCENTAGE(),
        this.vfzToken.TREASURY_SHARE(),
        this.vfzToken.REWARDS_SHARE()
      ]);

      return {
        totalSupply: ethers.formatUnits(totalSupply, decimals),
        decimals: Number(decimals),
        taxPercentage: Number(taxPercentage),
        feeSplit: {
          team: Number(treasuryShare),  // 4% to team
          winners: Number(rewardsShare)  // 1% to winners
        }
      };
    } catch (error) {
      console.error('Error getting token summary:', error);
      throw error;
    }
  }

  // Presale methods
  async getPresaleStatus() {
    try {
      const [
        totalRaised,
        totalTokensSold,
        hasStarted,
        hasEnded,
        presaleAllocation,
        price,
        participants
      ] = await Promise.all([
        this.presale.totalRaised(),
        this.presale.totalTokensSold(),
        this.presale.hasStarted(),
        this.presale.hasEnded(),
        this.presale.PRESALE_ALLOCATION(),
        this.presale.price(),
        this.getParticipantCount()
      ]);

      return {
        totalRaised: ethers.formatEther(totalRaised),
        totalTokensSold: ethers.formatEther(totalTokensSold),
        hasStarted: hasStarted,
        hasEnded: hasEnded,
        finalized: hasEnded,
        buyersCount: participants,
        presaleAllocation: ethers.formatEther(presaleAllocation),
        tokenPrice: ethers.formatEther(price)
      };
    } catch (error) {
      console.error('Error getting presale status:', error);
      throw error;
    }
  }

  private async getParticipantCount(): Promise<number> {
    try {
      // This would need to be tracked via events or a specific contract method
      // For now, return a placeholder
      return 0;
    } catch {
      return 0;
    }
  }

  // Winners methods
  async getLifetimeWinners() {
    try {
      const winnersSet = await this.rewardsDistributor.winnersSet();
      
      if (!winnersSet) {
        return {
          winnersSet: false,
          winners: []
        };
      }

      const winners = [];
      for (let i = 0; i < 5; i++) {
        const winner = await this.rewardsDistributor.lifetimeWinners(i);
        winners.push(winner);
      }

      return {
        winnersSet: true,
        winners: winners
      };
    } catch (error) {
      console.error('Error getting lifetime winners:', error);
      throw error;
    }
  }

  // Rewards methods
  async getPendingRewards(address: string) {
    try {
      // Validate address
      if (!ethers.isAddress(address)) {
        throw new Error('Invalid Ethereum address');
      }

      const [pendingRewards, claimedRewards] = await Promise.all([
        this.rewardsDistributor.pendingRewards(address),
        this.rewardsDistributor.claimedRewards(address)
      ]);

      return {
        address: address,
        pendingRewards: ethers.formatEther(pendingRewards),
        claimedRewards: ethers.formatEther(claimedRewards),
        totalEarned: ethers.formatEther(pendingRewards + claimedRewards)
      };
    } catch (error) {
      console.error('Error getting pending rewards:', error);
      throw error;
    }
  }

  // Helper method to check if contracts are deployed
  async checkContractsDeployed() {
    const vfzAddress = process.env.VFZ_TOKEN_ADDRESS;
    const presaleAddress = process.env.PRESALE_ADDRESS;
    const rewardsAddress = process.env.REWARDS_DISTRIBUTOR_ADDRESS;

    const checks = {
      vfzToken: false,
      presale: false,
      rewardsDistributor: false
    };

    if (vfzAddress && ethers.isAddress(vfzAddress)) {
      const code = await this.provider.getCode(vfzAddress);
      checks.vfzToken = code !== '0x';
    }

    if (presaleAddress && ethers.isAddress(presaleAddress)) {
      const code = await this.provider.getCode(presaleAddress);
      checks.presale = code !== '0x';
    }

    if (rewardsAddress && ethers.isAddress(rewardsAddress)) {
      const code = await this.provider.getCode(rewardsAddress);
      checks.rewardsDistributor = code !== '0x';
    }

    return checks;
  }
}