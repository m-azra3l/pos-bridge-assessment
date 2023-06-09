const { ethers } = require("hardhat");

async function main() {
  // Provider URL for the Goerli network
  const networkUrl = "https://ethereum-goerli.publicnode.com";

  // Create a provider using the specified network URL
  const provider = new ethers.providers.JsonRpcProvider(networkUrl);

  try {
    // Fetch the latest block number
    const blockNumber = await provider.getBlockNumber();
    console.log("Connected to network successfully.");
    console.log("Latest block number:", blockNumber);
  } catch (error) {
    console.error("Failed to connect to the network:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
