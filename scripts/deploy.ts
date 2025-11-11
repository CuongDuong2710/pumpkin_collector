import { ethers } from "hardhat";

async function main() {
  console.log("🎃 Deploying PumpkinCollectorNFT to Base network...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

  // Deploy the contract
  const PumpkinCollectorNFT = await ethers.getContractFactory("PumpkinCollectorNFT");
  
  // Deploy with deployer as initial owner
  const nft = await PumpkinCollectorNFT.deploy(deployer.address);
  
  await nft.waitForDeployment();
  const contractAddress = await nft.getAddress();

  console.log("✅ PumpkinCollectorNFT deployed to:", contractAddress);
  console.log("🔗 View on BaseScan:", `https://basescan.org/address/${contractAddress}`);

  // Verify the contract deployment
  console.log("\n📋 Contract Details:");
  console.log("Name:", await nft.name());
  console.log("Symbol:", await nft.symbol());
  console.log("Owner:", await nft.owner());
  console.log("Total Supply:", await nft.totalSupply());
  console.log("Mint Price:", ethers.formatEther(await nft.mintPrice()), "ETH");

  // Get tier requirements
  const requirements = await nft.getTierRequirements();
  console.log("\n🏆 Tier Requirements:");
  console.log("Bronze:", requirements[0].toString(), "points");
  console.log("Silver:", requirements[1].toString(), "points");
  console.log("Gold:", requirements[2].toString(), "points");
  console.log("Legendary:", requirements[3].toString(), "points");

  // Save deployment info
  const deploymentInfo = {
    network: "base",
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    blockNumber: await deployer.provider.getBlockNumber(),
    mintPrice: ethers.formatEther(await nft.mintPrice()),
    tierRequirements: {
      bronze: requirements[0].toString(),
      silver: requirements[1].toString(),
      gold: requirements[2].toString(),
      legendary: requirements[3].toString()
    }
  };

  console.log("\n💾 Deployment completed successfully!");
  console.log("Save this contract address to your environment variables:");
  console.log(`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${contractAddress}`);

  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });