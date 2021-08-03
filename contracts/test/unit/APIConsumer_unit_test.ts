import { Contract } from "ethers";

import {
  networkConfig,
  autoFundCheck,
  developmentChains,
} from "../../helper-hardhat-config";
import { getChainId, network, deployments, ethers, run, web3 } from "hardhat";
import { skipDescribeIf } from "../test-utils";
import { expect } from "chai";

skipDescribeIf(!developmentChains.includes(network.name))(
  "APIConsumer Unit Tests",
  async function () {
    let apiConsumer: Contract;
    let linkToken: Contract;

    beforeEach(async () => {
      const chainId = await getChainId();
      await deployments.fixture(["mocks", "api"]);
      const LinkToken = await deployments.get("LinkToken");
      linkToken = await ethers.getContractAt("LinkToken", LinkToken.address);
      const networkName = networkConfig[chainId]["name"];

      const linkTokenAddress = linkToken.address;
      const additionalMessage = " --linkaddress " + linkTokenAddress;

      const APIConsumer = await deployments.get("APIConsumer");
      apiConsumer = await ethers.getContractAt(
        "APIConsumer",
        APIConsumer.address
      );

      if (
        await autoFundCheck(
          getChainId,
          web3,
          ethers,
          apiConsumer.address,
          networkName,
          linkTokenAddress,
          additionalMessage
        )
      ) {
        await run("fund-link", {
          contract: apiConsumer.address,
          linkaddress: linkTokenAddress,
        });
      }
    });

    it("Should successfully make an API request", async () => {
      const transaction = await apiConsumer.requestVolumeData();
      const tx_receipt = await transaction.wait();
      const requestId = tx_receipt.events[0].topics[1];

      expect(requestId).to.not.be.null;
    });
  }
);
