// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UhanmiNFTs is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // URL for the prompt description
    string public promptURL =
        "https://gateway.pinata.cloud/ipfs/QmZF5S33oXteEZi5RpsQipt2UdmZ6YmENx32p6kTLaQpXR";

    address public owner;
    uint256 public totalSupply;

    constructor() ERC721("UhanmiNFTs", "UHM") {
        // Set the contract creator as the owner
        owner = msg.sender;
        // Initialize totalSupply to 0
        totalSupply = 0;
    }

    // Mint function to create and assign tokens to the caller
    function mint(string memory tokenURI) public returns (uint256) {
        // Check if the owner is the caller
        require(msg.sender == owner, "Only owner can mint new tokens");
        // Check if totalSupply is less than 6
        require(totalSupply < 6, "Total supply reached");
        _tokenIds.increment();
        totalSupply++;

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        // Limit the gas used for this transaction to 100,000
        // You can adjust this value based on your needs
        uint256 gasLimit = 1000000;
        require(gasleft() >= gasLimit, "Gas limit reached");

        return newTokenId;
    }

    // Function to get the prompt description URL
    function promptDescription() public view returns (string memory) {
        return promptURL;
    }
}
