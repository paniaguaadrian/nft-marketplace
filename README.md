# NFT-marketplace

- Comming soon... ⏳

## Features

- Comming soon... ⏳

## Tech Stack

**Client:** React, NextJs, TailwindCss, Chai

**Blockchain related:** Hardhat, Etheres, ipfs, nomiclabs, Polygon (Matic)

## Documentation

### Packages

[@nomiclabs/hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers) - This plugin brings to Hardhat the Ethereum library ethers.js, which allows you to interact with the Ethereum blockchain in a simple way.

[@nomiclabs/hardhat-waffle](https://www.npmjs.com/package/@nomiclabs/hardhat-waffle) - You can use this plugin to build smart contract tests using Waffle in Hardhat, taking advantage of both.

[@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts) - OpenZeppelin Contracts features a stable API, which means your contracts won't break unexpectedly when upgrading to a newer minor version.

[ethereum-waffle](https://www.npmjs.com/package/ethereum-waffle) - The most advanced framework for testing smart contracts.

[hardhat](https://www.npmjs.com/package/hardhat) - Hardhat is an Ethereum development environment for professionals. It facilitates performing frequent tasks, such as running tests, automatically checking code for mistakes or interacting with a smart contract. Check out the plugin list to use it with your existing tools.

[ipfs-http-clients](htA client library for the IPFS HTTP API, implemented in JavaScript. This client library implements the IPFS Core API enabling applications to change between an embedded js-ipfs node and any remote IPFS node without having to change the code. In addition, this client library implements a set of utility functions.

### Protocols

[Polygon(Matic) Networks](https://docs.polygon.technology/docs/develop/network-details/network) - On Polygon test networks there are a lot of traffic so maybe our work would fail. To solve this, we will be using Infura.

[Polygon test network => Polygon Mumbai](https://docs.polygon.technology/docs/develop/network-details/network)

[Infura](https://infura.io/) - Infura is a provider of different nodes and endpoints.

# Notes for Hardhat package

## Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Steps to Deploy contracts

# 1.- Run a local node

```shell
npx hardhat node
```

# 2.- Deploy our contracts

```shell
npx hardhat run scripts/deploy.js --network localhost
```

# 3.- Run our App

```shell
npm run dev
```
