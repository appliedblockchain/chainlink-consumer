# Chainlink Plugin Fund Link

A Hardhat plugin that transfers Link token between accounts.

## What

This plugin will help you transfer Link token between accounts.

## Installation

To install this plugin use:

```bash
npm install @appliedblockchain/chainlink-plugins-fund-link @nomiclabs/hardhat-ethers --save
```

Import the plugin in your `hardhat.config.js`:

```js
require("@appliedblockchain/chainlink-plugins-fund-link");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "@appliedblockchain/chainlink-plugins-fund-link";
```

## Required plugins

- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Tasks

This plugin adds a task to fund an account with Link token.

Fund account with Link token.
```
npx hardhat fund-link --contract <contract address> --linkaddress <link contract address> --fundamount <fund amount>
```

The Link address and the fund amount parameters are optional. This plugin uses the official Link addresses as default. Check the default values on the [configuration file]("https://github.com/appliedblockchain/chainlink-consumer/tree/master/plugins/fund-link/src/config.ts").

Example of funding on the Ethereum main network.
```
npx hardhat fund-link --contract 0xc0ffee254729296a45a3885639AC7E10F9d54979 --linkaddress 0x514910771af9ca656af840dff83e8264ecf986ca --fundamount 1000000000000000000
```

## Environment extensions

This plugin adds the function to transfer the Link token between accounts to the Hardhat Runtime Environment.

```
hre.fundLink(hre,contractAddress);
```

## Configuration

This plugin does not require configuration.

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and access the provided functions and the provided tasks through the Hardhat Runtime Environment anywhere you need it.
