import { task } from "hardhat/config";
import { getNetworkFromName } from "../helper-hardhat-config";

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
    const LinkToken = await ethers.getContractFactory("LinkToken");
    const linkTokenContract = new ethers.Contract(
      linkTokenAddress,
      LinkToken.interface,
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
      //Could also be Any-API contract, but in either case the function signature is the same, so we just need to use one
      const RandomNumberConsumer = await ethers.getContractFactory(
        "RandomNumberConsumer"
      );

      //Create connection to Consumer Contract and call the withdraw function
      const ConsumerContract = new ethers.Contract(
        contractAddr,
        RandomNumberConsumer.interface,
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
