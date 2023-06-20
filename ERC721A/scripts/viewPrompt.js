// This script fetches the prompt for generating Uhanmi NFT images

// Import required libraries
const fetch = require('node-fetch');
const { ethers } = require("hardhat");
const ABI = require("../artifacts/contracts/UhanmiNFT.sol/UhanmiNFT.json");

// Define the main function
async function main() {
  // Set the contract address, ABI, and network name
  const contractAddress = "0x212d5F48f982608365182cf038C5130952ec69c9";
  const contractABI = ABI.abi;
  const networkName = "https://ethereum-goerli.publicnode.com";

  // Create a provider using the network name
  const provider = ethers.getDefaultProvider(networkName);

  // Get an instance of the contract using the contract address and ABI
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // Get the prompt description from the contract
  const promptDescription = await contract.promptDescription();

  // Fetch the prompt from the URL in the prompt description
  const response = await fetch(promptDescription);
  const data = await response.json();

  // Log the prompt to the console
  console.log(`Prompt for generating Uhanmi NFT images:\n${data.prompt}`);
}

// Call the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
