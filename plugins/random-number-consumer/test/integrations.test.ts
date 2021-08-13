import LinkTokenABI from "@appliedblockchain/chainlink-contracts/abi/LinkToken.json";
import RandomNumberConsumerABI from "@appliedblockchain/chainlink-contracts/abi/RandomNumberConsumer.json";
import VRFCoordinatorMockABI from "@appliedblockchain/chainlink-contracts/abi/VRFCoordinatorMock.json";
import LinkTokenBytecode from "@appliedblockchain/chainlink-contracts/bytecode/LinkToken.json";
import RandomNumberConsumerBytecode from "@appliedblockchain/chainlink-contracts/bytecode/RandomNumberConsumer.json";
import VRFCoordinatorMockBytecode from "@appliedblockchain/chainlink-contracts/bytecode/VRFCoordinatorMock.json";
import { Contract } from "@ethersproject/contracts";
import { assert, expect } from "chai";

import { useEnvironment } from "./helpers";

const KEY_HASH =
  "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4";
const FEE = "100000000000000000";
const FUND_AMOUNT = "1000000000000000000";

describe("Integration", function () {
  describe("random-number", function () {
    useEnvironment();
    let randomNumberContract: Contract;

    beforeEach(async function () {
      const { ethers } = this.hre;

      const accounts = await ethers.getSigners();
      const signer = accounts[0];

      const linkTokenDeployer = new ethers.ContractFactory(
        LinkTokenABI,
        LinkTokenBytecode,
        signer
      );
      const linkToken = await linkTokenDeployer.deploy();
      await linkToken.deployTransaction.wait();

      const VRFCoordinatorMockDeployer = new ethers.ContractFactory(
        VRFCoordinatorMockABI,
        VRFCoordinatorMockBytecode,
        signer
      );
      const VRFCoordinatorMock = await VRFCoordinatorMockDeployer.deploy(
        linkToken.address
      );
      await VRFCoordinatorMock.deployTransaction.wait();

      const randomNumberDeployer = new ethers.ContractFactory(
        RandomNumberConsumerABI,
        RandomNumberConsumerBytecode,
        signer
      );
      randomNumberContract = await randomNumberDeployer.deploy(
        VRFCoordinatorMock.address,
        linkToken.address,
        KEY_HASH,
        FEE
      );
      await randomNumberContract.deployTransaction.wait();

      const transferTx = await linkToken.transfer(
        randomNumberContract.address,
        FUND_AMOUNT
      );
      await transferTx.wait();
    });

    it("Should throw an error if an invalid price consumer contract address is passed", function () {
      return assert.isRejected(
        this.hre.readRandomNumber(this.hre, "dummy address")
      );
    });

    it("Should return 0 if no random number was requested", async function () {
      const randomNumber = await this.hre.readRandomNumber(
        this.hre,
        randomNumberContract.address
      );

      expect(randomNumber).to.be.equal("0");
    });

    // it('Should get a different random number from the contract if a new random number was requested', async function () {
    //   this.timeout(50000)
    //   await this.hre.requestRandomNumber(this.hre, randomNumberContract.address)

    //   await new Promise(resolve => setTimeout(resolve, 30000))

    //   const randomNumber = await this.hre.readRandomNumber(this.hre, randomNumberContract.address)

    //   expect(randomNumber).to.be.not.equal('0')
    // })
  });
});
