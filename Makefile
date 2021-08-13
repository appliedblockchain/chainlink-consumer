install:
	yarn install

build:
	yarn workspace @appliedblockchain/chainlink-contracts compile
	yarn wsrun -x @appliedblockchain/chainlink-eslint-config -x @appliedblockchain/chainlink-plugins-consumer --stages build
