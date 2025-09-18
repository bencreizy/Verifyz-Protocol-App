const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("=== VeriFyz Protocol Deployment ===");
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("");

  // Configuration
  const TOKEN_NAME = process.env.TOKEN_NAME || "VeriFyz";
  const TOKEN_SYMBOL = process.env.TOKEN_SYMBOL || "VFYZ";
  const TREASURY = process.env.TREASURY_WALLET || deployer.address;
  const PRESALE_PRICE = hre.ethers.utils.parseEther("0.00005"); // $0.05 per token in ETH/MATIC
  const PRESALE_DURATION = 22 * 24 * 60 * 60; // 22 days (Sept 22 - Oct 13)
  const REWARD_RATE = hre.ethers.utils.parseEther("0.0001"); // Reward rate per second per token
  
  // Chainlink VRF v2 Configuration (Polygon Mainnet)
  const VRF_COORDINATOR = "0xAE975071Be8F8eE67addBC1A82488F1C24858067"; // Polygon Mainnet
  const SUBSCRIPTION_ID = process.env.CHAINLINK_SUBSCRIPTION_ID || "0";
  const KEY_HASH = "0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93"; // 200 gwei
  const CALLBACK_GAS_LIMIT = 200000;
  const REQUEST_CONFIRMATIONS = 3;
  const NUM_WORDS = 1;

  // Deploy contracts
  console.log("1. Deploying VerifyzVerifier token...");
  const VerifyzVerifier = await hre.ethers.getContractFactory("VerifyzVerifier");
  const token = await VerifyzVerifier.deploy(TOKEN_NAME, TOKEN_SYMBOL, TREASURY);
  await token.deployed();
  console.log("   ✓ VerifyzVerifier deployed to:", token.address);

  console.log("\n2. Deploying RewardsDistributor...");
  const RewardsDistributor = await hre.ethers.getContractFactory("RewardsDistributor");
  const rewardsDistributor = await RewardsDistributor.deploy();
  await rewardsDistributor.deployed();
  console.log("   ✓ RewardsDistributor deployed to:", rewardsDistributor.address);

  console.log("\n3. Deploying Rewards...");
  const Rewards = await hre.ethers.getContractFactory("Rewards");
  const rewards = await Rewards.deploy(token.address);
  await rewards.deployed();
  console.log("   ✓ Rewards deployed to:", rewards.address);

  console.log("\n4. Deploying Staking...");
  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(token.address, REWARD_RATE);
  await staking.deployed();
  console.log("   ✓ Staking deployed to:", staking.address);

  console.log("\n5. Deploying Presale...");
  const Presale = await hre.ethers.getContractFactory("Presale");
  const presale = await Presale.deploy(
    token.address,
    rewardsDistributor.address,
    deployer.address,
    PRESALE_PRICE,
    PRESALE_DURATION,
    VRF_COORDINATOR,
    SUBSCRIPTION_ID,
    KEY_HASH,
    CALLBACK_GAS_LIMIT,
    REQUEST_CONFIRMATIONS,
    NUM_WORDS
  );
  await presale.deployed();
  console.log("   ✓ Presale deployed to:", presale.address);

  // Post-deployment setup
  console.log("\n=== Post-deployment Setup ===");
  
  console.log("\n1. Configuring RewardsDistributor...");
  await rewardsDistributor.setRewardToken(token.address);
  console.log("   ✓ Set reward token");
  await rewardsDistributor.setTokenContract(token.address);
  console.log("   ✓ Set token contract");

  console.log("\n2. Configuring VerifyzVerifier...");
  await token.setRewardsDistributor(rewardsDistributor.address);
  console.log("   ✓ Set rewards distributor");
  await token.setFeeExemption(presale.address, true);
  console.log("   ✓ Set presale fee exemption");
  await token.setFeeExemption(staking.address, true);
  console.log("   ✓ Set staking fee exemption");
  await token.setFeeExemption(rewards.address, true);
  console.log("   ✓ Set rewards fee exemption");

  console.log("\n3. Transferring presale allocation...");
  const PRESALE_ALLOCATION = hre.ethers.utils.parseEther("175000000"); // 175M tokens
  await token.transfer(presale.address, PRESALE_ALLOCATION);
  console.log("   ✓ Transferred 175M VFYZ to presale");

  console.log("\n4. Transferring staking rewards...");
  const STAKING_REWARDS = hre.ethers.utils.parseEther("50000000"); // 50M tokens for staking rewards
  await token.transfer(staking.address, STAKING_REWARDS);
  console.log("   ✓ Transferred 50M VFYZ to staking");

  console.log("\n5. Transferring community rewards...");
  const COMMUNITY_REWARDS = hre.ethers.utils.parseEther("50000000"); // 50M tokens for community
  await token.transfer(rewards.address, COMMUNITY_REWARDS);
  console.log("   ✓ Transferred 50M VFYZ to rewards");

  // Save deployment addresses
  const deployment = {
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId,
    timestamp: new Date().toISOString(),
    contracts: {
      VerifyzVerifier: token.address,
      RewardsDistributor: rewardsDistributor.address,
      Rewards: rewards.address,
      Staking: staking.address,
      Presale: presale.address
    },
    configuration: {
      tokenName: TOKEN_NAME,
      tokenSymbol: TOKEN_SYMBOL,
      treasury: TREASURY,
      presalePrice: PRESALE_PRICE.toString(),
      presaleDuration: PRESALE_DURATION,
      vrfCoordinator: VRF_COORDINATOR,
      subscriptionId: SUBSCRIPTION_ID,
      keyHash: KEY_HASH
    }
  };

  const fs = require("fs");
  fs.writeFileSync(
    `deployments/${hre.network.name}-deployment.json`,
    JSON.stringify(deployment, null, 2)
  );

  console.log("\n=== Deployment Summary ===");
  console.log("All contracts deployed successfully!");
  console.log("\nContract Addresses:");
  console.log("  VerifyzVerifier:", token.address);
  console.log("  RewardsDistributor:", rewardsDistributor.address);
  console.log("  Rewards:", rewards.address);
  console.log("  Staking:", staking.address);
  console.log("  Presale:", presale.address);
  console.log("\nDeployment details saved to:", `deployments/${hre.network.name}-deployment.json`);
  console.log("\n⚠️  IMPORTANT: Remember to:");
  console.log("  1. Verify all contracts on Polygonscan");
  console.log("  2. Set lifetime winners after presale ends");
  console.log("  3. Enable fees after initial setup");
  console.log("  4. Start the presale when ready");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });