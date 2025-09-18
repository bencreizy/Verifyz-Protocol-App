const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const network = hre.network.name;
  const deploymentFile = `deployments/${network}-deployment.json`;
  
  if (!fs.existsSync(deploymentFile)) {
    console.error(`Deployment file not found: ${deploymentFile}`);
    console.error("Please run the deployment script first.");
    process.exit(1);
  }

  const deployment = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  
  console.log("=== Contract Verification ===");
  console.log("Network:", network);
  console.log("Chain ID:", deployment.chainId);
  console.log("");

  // Verify VerifyzVerifier
  console.log("1. Verifying VerifyzVerifier...");
  try {
    await hre.run("verify:verify", {
      address: deployment.contracts.VerifyzVerifier,
      constructorArguments: [
        deployment.configuration.tokenName,
        deployment.configuration.tokenSymbol,
        deployment.configuration.treasury
      ],
    });
    console.log("   ✓ VerifyzVerifier verified");
  } catch (error) {
    console.log("   ⚠️  VerifyzVerifier verification failed:", error.message);
  }

  // Verify RewardsDistributor
  console.log("\n2. Verifying RewardsDistributor...");
  try {
    await hre.run("verify:verify", {
      address: deployment.contracts.RewardsDistributor,
      constructorArguments: [],
    });
    console.log("   ✓ RewardsDistributor verified");
  } catch (error) {
    console.log("   ⚠️  RewardsDistributor verification failed:", error.message);
  }

  // Verify Rewards
  console.log("\n3. Verifying Rewards...");
  try {
    await hre.run("verify:verify", {
      address: deployment.contracts.Rewards,
      constructorArguments: [
        deployment.contracts.VerifyzVerifier
      ],
    });
    console.log("   ✓ Rewards verified");
  } catch (error) {
    console.log("   ⚠️  Rewards verification failed:", error.message);
  }

  // Verify Staking
  console.log("\n4. Verifying Staking...");
  try {
    await hre.run("verify:verify", {
      address: deployment.contracts.Staking,
      constructorArguments: [
        deployment.contracts.VerifyzVerifier,
        hre.ethers.utils.parseEther("0.0001")
      ],
    });
    console.log("   ✓ Staking verified");
  } catch (error) {
    console.log("   ⚠️  Staking verification failed:", error.message);
  }

  // Verify Presale
  console.log("\n5. Verifying Presale...");
  try {
    await hre.run("verify:verify", {
      address: deployment.contracts.Presale,
      constructorArguments: [
        deployment.contracts.VerifyzVerifier,
        deployment.contracts.RewardsDistributor,
        deployment.configuration.deployer || hre.ethers.utils.getAddress(deployment.configuration.treasury),
        deployment.configuration.presalePrice,
        deployment.configuration.presaleDuration,
        deployment.configuration.vrfCoordinator,
        deployment.configuration.subscriptionId,
        deployment.configuration.keyHash,
        200000, // callbackGasLimit
        3,      // requestConfirmations
        1       // numWords
      ],
    });
    console.log("   ✓ Presale verified");
  } catch (error) {
    console.log("   ⚠️  Presale verification failed:", error.message);
  }

  console.log("\n=== Verification Complete ===");
  console.log("Check Polygonscan for contract status:");
  console.log(`https://polygonscan.com/address/${deployment.contracts.VerifyzVerifier}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });