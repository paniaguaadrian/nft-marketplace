// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// Connected yo our npm package of OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// This give us an extra function "setTokenUrl" allows us to set the token URL
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Use this utility to increment numbers (like it's builded)
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT"){
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns(uint){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}