const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NFTMarket', function () {
  it('Should create and execute market sales', async function () {
    // First, get a reference to that market.
    const Market = await ethers.getContractFactory('NFTMarket')

    // Wait for the market be delpoyed.
    const market = await Market.deploy()
    await market.deployed()

    // Get a reference to the address of that market.
    const marketAddress = market.address

    // Deploy the NFT contract
    const NFT = await ethers.getContractFactory('NFT')

    // Create and deploy the nft with the actual marketAddress
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()

    // Get a reference of the nft address
    const nftContractAddress = nft.address

    // NOW we have deployed our contract, nft and market, we can interact with it.
    // Get the listing price
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    // Get the price of the item
    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    // Let's now create a token
    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    // List those tokens
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    })

    // Get different addresses from differents users, get a reference for test accounts.
    const [_, buyerAddress] = await ethers.getSigners()

    // We don't want the buyer to be the same person as the seller
    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice })

    // Query this market items
    let items = await market.fetchMarketItems()

    // Map on those items to get human readable data.
    // Transfor the Big numbers to numbers that we can read.
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        }
        return item
      })
    )

    console.log('items: ', items)
  })
})
