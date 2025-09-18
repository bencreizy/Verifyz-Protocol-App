# VeriFyz Protocol Deployment Guide

## Prerequisites

1. **Node.js & NPM**: Ensure you have Node.js (v16+) installed
2. **Hardhat**: Already configured in this project
3. **Wallet**: A wallet with sufficient MATIC for gas fees (2-3 MATIC recommended)
4. **API Keys**: 
   - Alchemy or Infura RPC URL for Polygon
   - Polygonscan API key for verification
   - Chainlink VRF v2 subscription (create at https://vrf.chain.link)

## Step 1: Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in:
   - `PRIVATE_KEY`: Your deployment wallet's private key
   - `POLYGON_RPC_URL`: Your Alchemy/Infura Polygon mainnet RPC URL
   - `POLYGON_AMOY_RPC_URL`: Your Alchemy/Infura Amoy testnet RPC URL
   - `POLYGONSCAN_API_KEY`: Your Polygonscan API key
   - `CHAINLINK_SUBSCRIPTION_ID`: Your Chainlink VRF subscription ID

## Step 2: Chainlink VRF Setup

1. Go to https://vrf.chain.link
2. Connect wallet and switch to Polygon network
3. Create a new subscription
4. Fund it with LINK tokens (minimum 5 LINK recommended)
5. Copy the subscription ID to your `.env` file

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Test Deployment (Amoy Testnet)

First, test on Amoy testnet:

```bash
# Compile contracts
npx hardhat compile

# Deploy to Amoy testnet
npx hardhat run scripts/deploy-all.js --network polygonAmoy

# Verify contracts on Amoy
npx hardhat run scripts/verify.js --network polygonAmoy
```

## Step 5: Mainnet Deployment

Once tested, deploy to mainnet:

```bash
# Deploy to Polygon mainnet
npx hardhat run scripts/deploy-all.js --network polygon

# Verify contracts on Polygonscan
npx hardhat run scripts/verify.js --network polygon
```

## Step 6: Post-Deployment Configuration

After deployment, the script automatically:
- ✅ Sets up RewardsDistributor with token addresses
- ✅ Configures fee exemptions for presale, staking, and rewards
- ✅ Transfers 175M VFYZ to presale contract
- ✅ Transfers 50M VFYZ to staking contract
- ✅ Transfers 50M VFYZ to rewards contract

You still need to:

1. **Add Presale Contract to VRF Subscription**:
   - Go to https://vrf.chain.link
   - Click on your subscription
   - Add the deployed Presale contract address as a consumer

2. **Start the Presale** (when ready):
```javascript
// Using Hardhat console
npx hardhat console --network polygon
> const presale = await ethers.getContractAt("Presale", "PRESALE_ADDRESS");
> await presale.startPresale();
```

3. **Enable Transaction Fees** (after presale):
```javascript
> const token = await ethers.getContractAt("VerifyzVerifier", "TOKEN_ADDRESS");
> await token.setFeesEnabled(true);
```

4. **Set Lifetime Winners** (after presale ends):
```javascript
> const distributor = await ethers.getContractAt("RewardsDistributor", "DISTRIBUTOR_ADDRESS");
> await distributor.setLifetimeWinners([winner1, winner2, winner3, winner4, winner5]);
```

## Step 7: Update Application

Update your application with deployed addresses:

1. Copy the deployment file: `deployments/polygon-deployment.json`
2. Update `.env` with the contract addresses
3. Update frontend environment variables (VITE_ prefixed)
4. Restart your application

## Contract Addresses

After deployment, your contracts will be at:
- **VerifyzVerifier**: [Will be shown after deployment]
- **RewardsDistributor**: [Will be shown after deployment]
- **Rewards**: [Will be shown after deployment]
- **Staking**: [Will be shown after deployment]
- **Presale**: [Will be shown after deployment]

## Security Checklist

- [ ] Private key is secure and never committed
- [ ] All contracts verified on Polygonscan
- [ ] VRF subscription funded with sufficient LINK
- [ ] Presale contract added to VRF subscription
- [ ] Treasury wallet is a multisig
- [ ] Emergency pause mechanisms tested
- [ ] Audit completed before mainnet deployment

## Troubleshooting

**Gas Price Issues**: If transactions fail, increase gas price in hardhat.config.js

**VRF Not Working**: Ensure:
- Subscription has LINK balance
- Presale contract is added as consumer
- Correct keyHash for Polygon network

**Verification Fails**: 
- Wait a few minutes after deployment
- Ensure correct constructor arguments
- Check Polygonscan API key is valid

## Emergency Procedures

**To Pause Presale**:
```javascript
> await presale.endPresale();
```

**To Disable Fees**:
```javascript
> await token.setFeesEnabled(false);
```

## Support

For issues or questions:
- Review deployment logs in `deployments/`
- Check contract events on Polygonscan
- Contact the development team

---

⚠️ **IMPORTANT**: Always test on testnet first. Never share your private keys. Keep backups of deployment files.