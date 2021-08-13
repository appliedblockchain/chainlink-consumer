import { task } from "hardhat/config";
import { getNetworkFromName } from "../helper-hardhat-config";
import ERC677ABI from "@appliedblockchain/chainlink-contracts/abi/ERC677.json";
import RandomNumberConsumerABI from "@appliedblockchain/chainlink-contracts/abi/RandomNumberConsumer.json";

task("withdraw-link", "Returns any LINK left in deployed contract")
  .addParam("contract", "The address of the contract")
  .addOptionalParam("linkaddress", "Set the LINK token address")
  .setAction(async (taskArgs, { ethers, web3, network }) => {
    const contractAddr = taskArgs.contract;
    const networkConfig = await getNetworkFromName(network.name);

    if (!networkConfig) {
      return;
    }

    //Get signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    //First, lets see if there is any LINK to withdraw
    const linkTokenAddress = networkConfig.linkToken || taskArgs.linkaddress;
    const linkTokenContract = new ethers.Contract(
      linkTokenAddress,
      ERC677ABI,
      signer
    );
    const balanceHex = await linkTokenContract.balanceOf(contractAddr);
    const balance = await web3.utils.toBN(balanceHex._hex).toString();
    console.log(
      "LINK balance of contract: " +
        contractAddr +
        " is " +
        +balance / Math.pow(10, 18)
    );

    if (+balance > 0) {
      //Create connection to Consumer Contract and call the withdraw function
      const ConsumerContract = new ethers.Contract(
        contractAddr,
        RandomNumberConsumerABI,
        signer
      );
      const result = await ConsumerContract.withdrawLink();
      console.log(
        "All LINK withdrew from contract " + contractAddr,
        ". Transaction Hash: ",
        result.hash
      );
    } else {
      console.log("Contract doesn't have any LINK to withdraw");
    }
  });

module.exports = {};
