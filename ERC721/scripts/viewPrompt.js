


// run node scripts/viewPrompt.js

const fetch = require('node-fetch');
const { ethers } = require("hardhat");
const ABI = require("../artifacts/contracts/UhanmiNFTs.sol/UhanmiNFTs.json");

async function main() {
  const contractAddress = "0xD8F6847fD533A93eeCD470de80685665bDca8c06";
  const contractABI = ABI.abi;
  const networkName = "https://ethereum-goerli.publicnode.com";
  const provider = ethers.getDefaultProvider(networkName);

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const promptDescription = await contract.promptDescription();

  const response = await fetch(promptDescription);
  const data = await response.json();
  console.log(`Prompt for generating Uhanmi NFT images:\n${data.prompt}`);
 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
