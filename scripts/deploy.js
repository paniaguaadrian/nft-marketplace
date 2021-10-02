const hre = require('hardhat')

async function main() {
  // Deploy our NFTMarket contract to the blockchain/node to use it.
  const NFTMarket = await hre.ethers.getContractFactory('NFTMarket')
  const nftMarket = await NFTMarket.deploy()
  await nftMarket.deployed()
  console.log('NFTMarket deployed to:', nftMarket.address)

  // Deploy our NFT contract to the blockchain/node to use it.
  const NFT = await hre.ethers.getContractFactory('NFT')
  const nft = await NFT.deploy(nftMarket.address)
  await nft.deployed()
  console.log('NFT deployed to:', nft.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
