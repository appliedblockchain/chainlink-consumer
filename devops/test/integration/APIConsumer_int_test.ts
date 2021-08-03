import { Contract } from "ethers";
import { developmentChains } from "../../helper-hardhat-config";
import { skipDescribeIf } from "../test-utils";
import { network, ethers, deployments, web3 } from "hardhat";
import { expect } from "chai";

skipDescribeIf(developmentChains.includes(network.name))(
  "APIConsumer Integration Tests",
  async function () {
    let apiConsumer: Contract;

    beforeEach(async () => {
      const APIConsumer = await deployments.get("APIConsumer");
      apiConsumer = await ethers.getContractAt(
        APIConsumer.abi,
        APIConsumer.address
      );
    });

    it("Should successfully make an external API request and get a result", async () => {
      const transaction = await apiConsumer.requestVolumeData();
      await transaction.wait();

      //wait 30 secs for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 30000));

      //Now check the result
      const result = await apiConsumer.volume();
      console.log(
        "API Consumer Volume: ",
        web3.utils.toBN(result._hex).toString()
      );
      expect(web3.utils.toBN(result._hex)).to.be.greaterThan(0);
    });
  }
);
