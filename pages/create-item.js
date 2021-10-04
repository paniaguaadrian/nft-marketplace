import { useState } from 'react'
import { useRouter } from 'next/router'

// Web3 / Blockchain packages
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })

  const router = useRouter()

  // * Function to create and update the file URL
  const onChange = async (e) => {
    const file = e.target.files[0] // Take the first item of the array

    try {
      // Ipload the file to IPFS
      // We track the process of the uploading with the callback function progress: ...
      const added = await client.add(file, { progress: (prog) => console.log(`received: ${prog}`) })

      // When is uploaded, we can access to the added url
      const url = `https://ipfs.infura.io:ipfs/${added.path}`

      // We save the url yo our state variable
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  // * Functions to List an Item for Sale createMarket() & createSale()
  // Create an item and save it to IPFS - Reference to the NFT
  const createMarket = async () => {
    // Get the values of the form input fields
    const { name, description, price } = formInput

    // Restrictions, we need those values
    if (!name || !description || !price || !fileUrl) return

    // Save this values to a data object
    const data = JSON.stringify({ name, description, image: fileUrl })

    try {
      // Save this data to IPFS
      const added = await client.add(data)

      // IPFS path that includes the name, description, and the image URL to a separate IPFS
      const url = `https://ipfs.infura.io:ipfs/${added.path}`

      // Set the url as the token url (Look at the next function)
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  // * Function to create the Sale or listing the item for sale
  // * And creating an NFT
  // This is like a submit button/action to create the item from the form.
  const createSale = async (url) => {
    // * Create a reference to the web3Modal
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // * Create the item
    // Interact with our NFT contract
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    // Create the token for the NFT
    let transaction = await contract.createToken(url)
    // Wait for that transaction succeed
    let tx = await transaction.wait()
    // We will get an events array with the transaction
    let event = tx.events[0]
    let value = event.args[2]
    // It's a big number so we'll turn it to a human readable number and get a reference to the token Id
    let tokenId = value.toNumber()

    // Get a reference to the price that we want to sell the NFT
    // We need the parseUnits to get a normal number, not one with 8 zeros
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    // * List the item for sale to the marketplace
    // Create a nftmarket reference for that item
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    // Get the listing price for the item
    // Send it like string to the contract so we're sure that we pay to get this item
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    // We wait for the contract createMarketItem to succeed
    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })

    await transaction.wait()

    // Reroute the user to another page after all succeed
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />

        <textarea
          placeholder="Assed Description"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />

        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />

        <input type="file" name="Asset" className="my-4" onChange={onChange} />

        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} alt="token image" />}

        <button onClick={createSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  )
}
