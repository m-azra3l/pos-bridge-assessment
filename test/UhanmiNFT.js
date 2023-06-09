const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("UhanmiNFT", function () {
  let contract;
  let owner;

  // This function is called before each test case to deploy a new instance of the contract
  beforeEach(async function () {
    // Get the owner account
    [owner] = await ethers.getSigners();

    // Deploy the contract
    const UhanmiNFT = await ethers.getContractFactory("UhanmiNFT");
    contract = await UhanmiNFT.deploy();
    await contract.deployed();
  });

  // Test case to check that the total supply is 0 when the contract is deployed
  it("should have a total supply of 0 at deployment", async function () {
    expect(await contract.totalSupply()).to.equal(0);
  });

  // Test case to check that the collection URL is set correctly when the contract is deployed
  it("should have a collection URL set at deployment", async function () {
    expect(await contract.collectionURL()).to.equal("https://gateway.pinata.cloud/ipfs/Qmbq6gMuAsi6YfuZ4DVa91zEMuNpWXHYG4AWAgP8zm9S2F");
  });

  // Test case to check that the prompt URL is set correctly when the contract is deployed
  it("should have a prompt URL set at deployment", async function () {
    expect(await contract.promptURL()).to.equal("https://gateway.pinata.cloud/ipfs/QmZF5S33oXteEZi5RpsQipt2UdmZ6YmENx32p6kTLaQpXR");
  });

  // Test case to check that the contract can mint NFTs when called with a valid quantity
  it("should mint NFTs when called with a valid quantity", async function () {
    // Mint 5 NFTs
    await contract.mint(5);

    // Check that the total supply is updated correctly
    expect(await contract.totalSupply()).to.equal(5);

    // Check that the owner has 5 NFTs
    expect(await contract.balanceOf(owner.address)).to.equal(5);
  });

  // Test case to check that the contract cannot mint NFTs when called with an invalid quantity
  it("should not mint NFTs when called with an invalid quantity", async function () {
    // Try to mint 10 NFTs (there are only 5 tokens available)
    await expect(contract.mint(10)).to.be.revertedWith("No more tokens remaining to mint");

    // Check that the total supply is still 0
    expect(await contract.totalSupply()).to.equal(0);

    // Check that the owner doesn't have any NFTs
    expect(await contract.balanceOf(owner.address)).to.equal(0);
  });

  // Test case to check that the prompt description URL is set correctly when the contract is deployed
  it("should return the correct prompt description URL", async function () {
    expect(await contract.promptDescription()).to.equal(
      "https://gateway.pinata.cloud/ipfs/QmZF5S33oXteEZi5RpsQipt2UdmZ6YmENx32p6kTLaQpXR"
    );
  });
});