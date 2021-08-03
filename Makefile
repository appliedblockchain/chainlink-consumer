install:
	yarn install

build:
	yarn workspace @chainlink-consumer/contracts compile
	yarn wsrun -x @chainlink-consumer/eslint-config -x @chainlink-consumer/plugins-consumer --stages build
