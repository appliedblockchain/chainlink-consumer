import {
  networkConfig,
  autoFundCheck,
  developmentChains,
} from "../../helper-hardhat-config";
import { network, getChainId, deployments, ethers, run, web3 } from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { skipDescribeIf } from "../test-utils";
import { expect } from "chai";

skipDescribeIf(!developmentChains.includes(network.name))(
  "RandomNumberConsumer Unit Tests",
  async function () {
    let randomNumberConsumer: Contract;

    beforeEach(async () => {
      const chainId = await getChainId();
      await deployments.fixture(["mocks", "vrf"]);
      const LinkToken = await deployments.get("LinkToken");
      const linkToken = await ethers.getContractAt(
        "LinkToken",
        LinkToken.address
      );
      const networkName = networkConfig[chainId]["name"];

      const linkTokenAddress = linkToken.address;
      const additionalMessage = " --linkaddress " + linkTokenAddress;

      const RandomNumberConsumer = await deployments.get(
        "RandomNumberConsumer"
      );
      randomNumberConsumer = await ethers.getContractAt(
        "RandomNumberConsumer",
        RandomNumberConsumer.address
      );

      if (
        await autoFundCheck(
          getChainId,
          web3,
          ethers,
          randomNumberConsumer.address,
          networkName,
          linkTokenAddress,
          additionalMessage
        )
      ) {
        await run("fund-link", {
          contract: randomNumberConsumer.address,
          linkaddress: linkTokenAddress,
        });
      }
    });

    it("Should successfully make an external random number request", async () => {
      const transaction = await randomNumberConsumer.getRandomNumber();
      const tx_receipt = await transaction.wait(1);
      const requestId = tx_receipt.events[2].topics[1];

      expect(requestId).to.not.be.null;
    });
  }
);
