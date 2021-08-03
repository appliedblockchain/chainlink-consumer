import { skipDescribeIf } from "./../test-utils";
import { Contract } from "ethers";
import { deployments, network, ethers, web3 } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { expect } from "chai";

skipDescribeIf(!developmentChains.includes(network.name))(
  "PriceConsumer Unit Tests",
  async function () {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    let priceConsumerV3: Contract;

    beforeEach(async () => {
      await deployments.fixture(["mocks", "feed"]);
      const PriceConsumerV3 = await deployments.get("PriceConsumerV3");
      priceConsumerV3 = await ethers.getContractAt(
        "PriceConsumerV3",
        PriceConsumerV3.address
      );
    });

    it("should return a positive value", async () => {
      const result = await priceConsumerV3.getLatestPrice();
      console.log(
        "Price Feed Value: ",
        web3.utils.toBN(result._hex).toString()
      );
      expect(+web3.utils.toBN(result._hex).toString()).greaterThan(
        +web3.utils.toBN(0)
      );
    });
  }
);
