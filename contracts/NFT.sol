// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// Connected yo our npm package of OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// This give us an extra function "setTokenUrl" allows us to set the token URL
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Use this utility to increment numbers (like it's builded)
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter; // Use the counter utility to control increment or decrement numbers
    Counters.Counter private _tokenIds; // The variable of that counter would be called _tokenIds, starting at 0.
    address contractAddress; // The Address of the marketplace that we want to allow the nft to interact with. Transact or change the ownership of the tokens

 /* ----------------------------------------------------------------------------------------
    Takes the marketplace address as the only argument, and we set the contractAddress to this marketplaceAddress.
    We first deploy the market, and then deploy the contract.
----------------------------------------------------------------------------------------- */
    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT"){
        contractAddress = marketplaceAddress;
    }

    // This function is used to set the token URL. This is used for minting new tokens.
    function createToken(string memory tokenURI) public returns(uint){
        _tokenIds.increment(); // Increment the tokensIds, from 0 to 1, 2, 3 ...
        uint256 newItemId = _tokenIds.current(); // Get the current value of the tokenIds

        /* ----------------------------------------------------------------------------------------
        Minting means creating a non-fungible token (NFT) from a program (on Solana) or a contract (on Ethereum). Both networks support NFTs. The data 'inside' the NFT can be anything and stored anywhere.

        How the digital art becomes a part of the Ethereum. msg.sender === creator of the token.

        So, we are creating a NFT with the newItemId (which has been incremented), the tokenURI (which is the URL of the token) and, the creator of the token (which is the msg.sender)
        ----------------------------------------------------------------------------------------- */
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI); // Create the token URI of that token.
        setApprovalForAll(contractAddress, true); // Give to the marketplace the approval to transact tihs token between users.
        return newItemId; // We return this to interact with this smart contract from our client app (React/Next)
    }
}