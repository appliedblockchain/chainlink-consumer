import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import ethers from "ethers/lib/ethers";
import LinkTokenBytecode from "@appliedblockchain/chainlink-contracts/bytecode/LinkToken.json";
import LinkTokenABI from "@appliedblockchain/chainlink-contracts/abi/LinkToken.json";
import { assert } from "chai";

import { useEnvironment } from "./helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function deployLinkToken(
  provider: typeof ethers & HardhatEthersHelpers,
  signer: SignerWithAddress
) {
  const linkTokenDeployer = new provider.ContractFactory(
    LinkTokenABI,
    LinkTokenBytecode,
    signer
  );

  const linkToken = await linkTokenDeployer.deploy();
  await linkToken.deployTransaction.wait();
  return linkToken;
}

describe("Integration", function () {
  useEnvironment();

  describe("fundLink", function () {
    it("should throw an error if a network is unsupported", async function () {
      const replacedNetwork = this.hre.network.name;

      this.hre.network.name = "dummy network";

      await assert.isRejected(
        this.hre.fundLink(this.hre, "dummy address"),
        `The network with the name "dummy network" is not supported.`
      );

      this.hre.network.name = replacedNetwork;
    });

    it("should return error that requests a Link token address if none was provided and it does not exist on default configuration", function () {
      return assert.isRejected(
        this.hre.fundLink(this.hre, "dummy address"),
        `Please provide the Link contract address.`
      );
    });

    it("should return an error if the Link token address is invalid", function () {
      return assert.isRejected(
        this.hre.fundLink(
          this.hre,
          "dummy address",
          "100",
          "invalid token address"
        ),
        "Transfer failed. Check whether the Link address is valid or whether your account has enough funds."
      );
    });

    it("should transfer a Link amount to an account", async function () {
      const { ethers } = this.hre;

      const accounts = await ethers.getSigners();

      const linkToken = await deployLinkToken(ethers, accounts[0]);

      const fundAmount = "2000000000000000000";
      const receipt = await this.hre.fundLink(
        this.hre,
        accounts[1].address,
        fundAmount,
        linkToken.address
      );

      const balance = await linkToken.balanceOf(accounts[1].address);

      assert.equal(receipt.amount, fundAmount);
      assert.equal(fundAmount, balance.toString());
      assert.equal(66, receipt.transactionHash.length);
    });

    it("should transfer the default hardhat Link amount to an account", async function () {
      const { ethers } = this.hre;

      const accounts = await ethers.getSigners();

      const linkToken = await deployLinkToken(ethers, accounts[0]);

      const receipt = await this.hre.fundLink(
        this.hre,
        accounts[1].address,
        "",
        linkToken.address
      );

      const balance = await linkToken.balanceOf(accounts[1].address);

      const defaultAmount = "1000000000000000000";

      assert.equal(receipt.amount, defaultAmount);
      assert.equal(defaultAmount, balance.toString());
      assert.equal(66, receipt.transactionHash.length);
    });
  });
});
