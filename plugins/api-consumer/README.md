# Chainlink Consumer API Consumer

A Hardhat plugin that interacts with the Chainlink API Consumer contract.

## What

This plugin will help you read data from a Chainlink API Consumer and call functions to update the data.

## Installation

To install this plugin use:

```bash
npm install @chainlink-consumer/plugins-api-consumer @nomiclabs/hardhat-ethers --save
```

Import the plugin in your `hardhat.config.js`:

```js
require("@chainlink-consumer/plugins-api-consumer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "@chainlink-consumer/plugins-api-consumer";
```


## Required plugins

- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Tasks

This plugin adds two tasks to interact with a API Consumer contract.

Read the contract data.
```
npx hardhat read-data --contract <contract address>
```

Request the data to be updated. It may take some minutes until a Chainlink node updates the data.
```
npx hardhat request-data --contract <contract address>
```

## Environment extensions

This plugin adds the functions `readData` and `requestData` to the Hardhat Runtime Environment.

Read the contract data.
```
hre.readData(hre,contractAddress);
```

Request the data to be updated. It may take some minutes until a Chainlink node updates the data.
```
hre.requestData(hre,contractAddress);
```

## Configuration

This plugin does not require configuration.

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and access the provided functions and the provided tasks through the Hardhat Runtime Environment anywhere you need it.
