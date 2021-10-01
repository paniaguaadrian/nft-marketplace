require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const fs = require('fs')
const privateKey = fs.readFileSync('.secret').toString()

const projectId = process.env.PROJECT_ID

module.exports = {
  networks: {
    // Setting up our networks environment
    hardhat: {
      chainId: 1337,
    },
    // Test network for Polygon
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
  solidity: '0.8.4',
}
