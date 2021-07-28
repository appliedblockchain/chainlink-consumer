import { assert, expect } from "chai";
import PriceConsumerV3ABI from '@chainlink-consumer/contracts/abi/PriceConsumerV3.json'
import PriceConsumerV3Bytecode from '@chainlink-consumer/contracts/bytecode/PriceConsumerV3.json'
import MockV3AggregatorABI from '@chainlink-consumer/contracts/abi/MockV3Aggregator.json'
import MockV3AggregatorBytecode from '@chainlink-consumer/contracts/bytecode/MockV3Aggregator.json'

import { useEnvironment } from "./helpers";

const MOCK_PRICE = 200_000_000_000_000_000_000

describe("Integration", function () {
  useEnvironment();

  describe("readPriceFeed", function () {

    it('Should throw an error if an invalid price consumer contract address is passed', function () {
      return assert.isRejected(this.hre.readPriceFeed(this.hre, "dummy address"))
    })

    it("Should return the feed price", async function () {
      const { ethers } = this.hre

      const accounts = await ethers.getSigners()
      const signer = accounts[0]

      const mockAggregatorDeployer = new ethers.ContractFactory(MockV3AggregatorABI, MockV3AggregatorBytecode, signer)
      const aggregator = await mockAggregatorDeployer.deploy('18', '' + MOCK_PRICE)
      await aggregator.deployTransaction.wait()

      const priceConsumerDeployer = new ethers.ContractFactory(PriceConsumerV3ABI, PriceConsumerV3Bytecode, signer)
      const priceConsumer = await priceConsumerDeployer.deploy(aggregator.address)
      await priceConsumer.deployTransaction.wait()

      const priceFeed = await this.hre.readPriceFeed(this.hre, priceConsumer.address).then(n => +n)

      expect(priceFeed).to.be.equal(MOCK_PRICE)
    });
  });
});
