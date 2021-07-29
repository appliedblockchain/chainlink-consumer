install:
	yarn install

build:
	yarn workspace @chainlink-consumer/contracts compile
	yarn wsrun -x @chainlink-consumer/contracts -x @chainlink-consumer/plugins-consumer -x dapp --stages build
