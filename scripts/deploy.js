const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("Starting VeriFyz Protocol deployment on Polygon...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "MATIC\n");

  // Get treasury wallet from environment
  const treasuryWallet = process.env.TREASURY_WALLET_ADDRESS || deployer.address;
  console.log("Treasury wallet address:", treasuryWallet);

  // Deploy VFZToken
  console.log("\n1. Deploying VFZToken...");
  const VFZToken = await ethers.getContractFactory("VerifyzVerifier");
  const vfzToken = await VFZToken.deploy(treasuryWallet);
  await vfzToken.deployed();
  console.log("VFZToken deployed to:", vfzToken.address);

  // Deploy RewardsDistributor
  console.log("\n2. Deploying RewardsDistributor...");
  const RewardsDistributor = await ethers.getContractFactory("RewardsDistributor");
  const rewardsDistributor = await RewardsDistributor.deploy();
  await rewardsDistributor.deployed();
  console.log("RewardsDistributor deployed to:", rewardsDistributor.address);

  // Deploy Presale
  console.log("\n3. Deploying Presale contract...");
  const Presale = await ethers.getContractFactory("Presale");
  
  // Presale constructor parameters
  const presaleParams = {
    tokenAddress: vfzToken.address,
    rewardsDistributorAddress: rewardsDistributor.address,
    owner: deployer.address,
    price: ethers.utils.parseEther("0.05"), // 0.05 MATIC per token
    duration: 14 * 24 * 60 * 60, // 14 days
    // Chainlink VRF parameters for Polygon Mainnet
    vrfCoordinator: "0xAE975071Be8F8eE67addBC1A82488F1C24858067",
    linkToken: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    keyHash: "0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd",
    vrfFee: ethers.utils.parseEther("0.0001")
  };

  const presale = await Presale.deploy(
    presaleParams.tokenAddress,
    presaleParams.rewardsDistributorAddress,
    presaleParams.owner,
    presaleParams.price,
    presaleParams.duration,
    presaleParams.vrfCoordinator,
    presaleParams.linkToken,
    presaleParams.keyHash,
    presaleParams.vrfFee
  );
  await presale.deployed();
  console.log("Presale deployed to:", presale.address);

  // Update token contract with RewardsDistributor address
  console.log("\n4. Setting RewardsDistributor in VFZToken...");
  const setRewardsTx = await vfzToken.setRewardsDistributor(rewardsDistributor.address);
  await setRewardsTx.wait();
  console.log("RewardsDistributor set in VFZToken");

  // Transfer presale allocation to presale contract
  console.log("\n5. Transferring presale allocation...");
  const presaleAllocation = ethers.utils.parseEther("175000000"); // 175M tokens
  const transferTx = await vfzToken.transfer(presale.address, presaleAllocation);
  await transferTx.wait();
  console.log("Transferred 175,000,000 VFYZ tokens to presale contract");

  // Print deployment summary
  console.log("\n========================================");
  console.log("DEPLOYMENT COMPLETED SUCCESSFULLY!");
  console.log("========================================");
  console.log("\nContract Addresses:");
  console.log("-------------------");
  console.log(`VFZ_TOKEN_ADDRESS=${vfzToken.address}`);
  console.log(`PRESALE_ADDRESS=${presale.address}`);
  console.log(`REWARDS_DISTRIBUTOR_ADDRESS=${rewardsDistributor.address}`);
  console.log("\nAdd these addresses to your .env file");
  console.log("========================================\n");

  // Verify contracts on Polygonscan (optional)
  if (process.env.POLYGONSCAN_API_KEY) {
    console.log("Waiting for block confirmations before verification...");
    await vfzToken.deployTransaction.wait(5);
    
    console.log("Verifying contracts on Polygonscan...");
    try {
      await hre.run("verify:verify", {
        address: vfzToken.address,
        constructorArguments: [treasuryWallet],
      });
      console.log("VFZToken verified");
    } catch (error) {
      console.error("VFZToken verification failed:", error);
    }

    try {
      await hre.run("verify:verify", {
        address: rewardsDistributor.address,
        constructorArguments: [],
      });
      console.log("RewardsDistributor verified");
    } catch (error) {
      console.error("RewardsDistributor verification failed:", error);
    }

    try {
      await hre.run("verify:verify", {
        address: presale.address,
        constructorArguments: [
          presaleParams.tokenAddress,
          presaleParams.rewardsDistributorAddress,
          presaleParams.owner,
          presaleParams.price,
          presaleParams.duration,
          presaleParams.vrfCoordinator,
          presaleParams.linkToken,
          presaleParams.keyHash,
          presaleParams.vrfFee
        ],
      });
      console.log("Presale verified");
    } catch (error) {
      console.error("Presale verification failed:", error);
    }
  }
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });