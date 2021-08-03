# Chainlink Consumer

A monorepo with fully Chainlink working end to end scenarios. There are tools and examples on how to interact with Chainlink network.

## Requirements

- [NPM](https://www.npmjs.com/)
- [YARN](https://yarnpkg.com/)

## Project Structure

| Package | Description |
| --- | --- |
| @chainlink-consumer/contracts |  Smart contracts consumers that interact with oracles and Chainlink coordinators. It also provides scripts to deploy and test locally the smart contracts. |
| @chainlink-consumer/dapp | Example of frontend application that read and update data of Chainlink smart contracts. |
| @chainlink-consumer/eslint-config | Shareable eslint configuration used in every package of this monorepo. |
| @chainlink-consumer/plugins-api-consumer | Plugin that extends Hardhat environment with utilities to interact with the API Consumer contract. |
| @chainlink-consumer/plugins-price-consumer | Plugin that extends Hardhat environment with utilities to interact with the Price Consumer contract. |
| @chainlink-consumer/plugins-random-number-consumer | Plugin that extends Hardhat environment with utilities to interact with the Verifiable Random Function Consumer contract. |
| @chainlink-consumer/plugins-consumer | Example of Hardhat application that uses the plugins of this monorepo to setup Hardhat tasks. |

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
