import { Contract } from "ethers";
import { expect } from "chai";
import { network, deployments, ethers, web3 } from "hardhat";

import { developmentChains } from "../../helper-hardhat-config";
import { skipDescribeIf } from "../test-utils";

skipDescribeIf(developmentChains.includes(network.name))(
  "RandomNumberConsumer Integration Tests",
  async function () {
    let randomNumberConsumer: Contract;

    beforeEach(async () => {
      const RandomNumberConsumer = await deployments.get(
        "RandomNumberConsumer"
      );
      randomNumberConsumer = await ethers.getContractAt(
        "RandomNumberConsumer",
        RandomNumberConsumer.address
      );
    });

    it("Should successfully make a VRF request and get a result", async () => {
      const transaction = await randomNumberConsumer.getRandomNumber();
      await transaction.wait();

      //wait 30 secs for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 30000));

      const result = await randomNumberConsumer.randomResult();
      console.log("VRF Result: ", web3.utils.toBN(result._hex).toString());
      expect(web3.utils.toBN(result._hex)).to.be.greaterThan(0);
    });
  }
);
