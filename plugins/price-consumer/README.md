# Chainlink Consumer Price Consumer

A Hardhat plugin that interacts with the Chainlink Price Consumer contract.

## What

This plugin will help you read the price from a Chainlink Price Consumer.

## Installation

To install this plugin use:

```bash
npm install @appliedblockchain/chainlink-plugins-price-consumer @nomiclabs/hardhat-ethers --save
```

Import the plugin in your `hardhat.config.js`:

```js
require("@appliedblockchain/chainlink-plugins-price-consumer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "@appliedblockchain/chainlink-plugins-price-consumer";
```


## Required plugins

- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Tasks

This plugin adds a task to fetch the price held in the Price Consumer contract.

Read the contract price.
```
npx hardhat read-price-feed --contract <contract address>
```

## Environment extensions

This plugin adds the function to read the price feed to the Hardhat Runtime Environment.
```
hre.readPriceFeed(hre,contractAddress);
```

## Configuration

This plugin does not require configuration.

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and access the provided functions and the provided tasks through the Hardhat Runtime Environment anywhere you need it.
