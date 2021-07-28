# Chainlink

A monorepo with fully Chainlink working end to end scenarios.

## Project Structure

* `contracts` - Smart contracts consumers that interact with oracles and Chainlink coordinators
* `dapp` - Frontend application with examples of interaction with the contracts consumers
* `plugins` - Hardhat plugins that extend hardhat environment with utilities to easily interact with the contracts consumers
* `plugins-consumer` - Example of Hardhat project that uses the plugins on tasks definitions

## Install

**Note:** Run next steps before using each package for development purposes.

1. Install NodeJS 12.18 & Yarn
2. Install repositories dependencies
```
$ make install
```
3. Build all packages
```
$ make build
```
