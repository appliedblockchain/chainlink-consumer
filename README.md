# Chainlink Consumer

A monorepo with fully Chainlink working end to end scenarios. There are tools and examples on how to interact with Chainlink network.

## Requirements

- [NPM](https://www.npmjs.com/)
- [YARN](https://yarnpkg.com/)

## Project Structure

| Package | Description |
| --- | --- |
| @appliedblockchain/chainlink-contracts |  Smart contracts consumers source code that interact with oracles and Chainlink coordinators.  |
| @appliedblockchain/chainlink-dapp | Example of frontend application that read and update data of Chainlink smart contracts. |
| @appliedblockchain/chainlink-eslint-config | Shareable eslint configuration used in every package of this monorepo. |
| @appliedblockchain/chainlink-plugins-api-consumer | Plugin that extends Hardhat environment with utilities to interact with the API Consumer contract. |
| @appliedblockchain/chainlink-plugins-price-consumer | Plugin that extends Hardhat environment with utilities to interact with the Price Consumer contract. |
| @appliedblockchain/chainlink-plugins-random-number-consumer | Plugin that extends Hardhat environment with utilities to interact with the Verifiable Random Function Consumer contract. |
| @appliedblockchain/chainlink-devops | Hardhat application that provides scripts to deploy and test the contracts. The plugins of this monorepo are setup in this package. |

## Development Setup

1. Install NodeJS 12.18 & Yarn
2. Install repositories dependencies
```
$ make install
```
3. Build all packages
```
$ make build
```

## Development Tips
For more tips on how to build and test Chainlink, see the [documentation](https://docs.chain.link/docs/tutorials/).

## Contributing
Chainlink's source code is licensed under the MIT License, and contributions are welcome.

Thank you!

## License
[MIT](https://choosealicense.com/licenses/mit/)
