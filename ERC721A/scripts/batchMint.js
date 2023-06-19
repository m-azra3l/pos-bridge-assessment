const { ethers } = require("hardhat");
const fs = require("fs");
const ABI = require("../artifacts/contracts/UhanmiNFTs.sol/UhanmiNFTs.json");
require("dotenv").config();
const path = require('path');

async function main() {
  const contractAddress = "0xD8F6847fD533A93eeCD470de80685665bDca8c06";
  const contractABI = ABI.abi;
  const networkAddress = "https://ethereum-goerli.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  const tokenURIs = [
    "https://gateway.pinata.cloud/ipfs/QmV7p5wUDpc8iADNWZdQv74qAYatJfnP4e4ZAUBWtaLSeL?filename=UhanmiV1",
    "https://gateway.pinata.cloud/ipfs/QmZPjiZgmZR59zkE6gq3kgG9jUTkByU46zt8h9mnT2vZ14?filename=UhanmiV2",
    "https://gateway.pinata.cloud/ipfs/QmYei51cEs9z2QVRNUtCcJHixUptj7EaRstpMAtYpoEfJL?filename=UhanmiV3",
    "https://gateway.pinata.cloud/ipfs/QmRaT3GXTZGAYifmqMGNJj8rJRBPWSfo1VwXbnxdsywL3j?filename=UhanmiV4",
    "https://gateway.pinata.cloud/ipfs/QmU2iZdTfUV6pVQPWRcuCw1uuSNmGYMhSsCGGsWPVPEiwD?filename=UhanmiV5"
  ];

  const promises = [];

  for (let i = 0; i < tokenURIs.length; i++) {
    promises.push(contract.mint(tokenURIs[i]));
  }

  const results = await Promise.all(promises);

  const tokenData = [];

  for (let i = 0; i < results.length; i++) {
    const tokenId = results[i].toString();
    const tokenURI = await contract.tokenURI(tokenId);

    const data = {
      id: tokenId,
      uri: tokenURI
    };

    tokenData.push(data);
  }

  fs.writeFileSync(
    'metadata/mintedNFTs.json',
    JSON.stringify(tokenData)
  );

  console.log("All NFTs minted successfully and saved to nfts.json!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});