const { ethers } = require("hardhat");
const ABI = require("../artifacts/contracts/UhanmiNFTs.sol/UhanmiNFTs.json");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
require("dotenv").config();

async function main() {
  const contractAddress = "0xD8F6847fD533A93eeCD470de80685665bDca8c06";
  const contractABI = ABI.abi;
  const networkAddress = "https://ethereum-goerli.publicnode.com";
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet); 

  const tokenIds = [1, 2, 3, 4, 5];

  const bridgeAddress = "0x823eF03B39C339337E451d82cEC57f31316de15F";
  const bridgeABI = FXRootContractAbi;
  const bridge = new ethers.Contract(bridgeAddress, bridgeABI, provider);

  const approvePromises = [];

  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const tx = await contract.approve(bridge.address, tokenId);
    approvePromises.push(tx.wait());
		console.log('Token #' + tokenId + ' approved');
  }

  await Promise.all(approvePromises);

  const depositPromises = [];

  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const tx = await bridge.deposit(contract.address, wallet.address, tokenId, {
      value: ethers.utils.parseEther("0"), 
    });
    depositPromises.push(tx.wait());
    
		console.log('Token #' + tokenId + ' deposited');
  }

  await Promise.all(depositPromises);

  const mumbaiProvider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
  const mumbaiContract = new ethers.Contract(contractAddress, contractABI, mumbaiProvider);

  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    const balance = await mumbaiContract.balanceOf(wallet.address, tokenId);
    console.log(`Balance of token ${tokenId} on Mumbai: ${balance.toString()}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
