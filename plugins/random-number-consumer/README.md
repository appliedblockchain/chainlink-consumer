# Chainlink Consumer Random Number Consumer

A Hardhat plugin that interacts with the Chainlink Random Number Consumer contract.

## What

This plugin will help you read data from a Chainlink Random Number Consumer and call functions to update the data.

## Installation

To install this plugin use:

```bash
npm install @appliedblockchain/chainlink-plugins-random-number-consumer @nomiclabs/hardhat-ethers --save
```

Import the plugin in your `hardhat.config.js`:

```js
require("@appliedblockchain/chainlink-plugins-random-number-consumer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "@appliedblockchain/chainlink-plugins-random-number-consumer";
```


## Required plugins

- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Tasks

This plugin adds two tasks to interact with a Random Number Consumer contract.

Read the contract random number.
```
npx hardhat read-random-number --contract <contract address>
```

Request the random number to be updated. It may take some minutes until a Chainlink node updates the data.
```
npx hardhat request-random-number --contract <contract address>
```

## Environment extensions

This plugin adds the functions `readRandomNumber` and `requestRandomNumber` to the Hardhat Runtime Environment.

Read the contract data.
```
hre.readRandomNumber(hre,contractAddress);
```

Request the random number to be updated. It may take some minutes until a Chainlink node updates the data.
```
hre.requestRandomNumber(hre,contractAddress);
```

## Configuration

This plugin does not require configuration.

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and access the provided functions and the provided tasks through the Hardhat Runtime Environment anywhere you need it.
