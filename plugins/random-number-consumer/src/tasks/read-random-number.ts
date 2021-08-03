import { task } from "hardhat/config";

task(
  "read-random-number",
  "Reads the random number returned to a contract by Chainlink VRF"
)
  .addParam("contract", "The address of the VRF contract that you want to read")
  .setAction(async ({ contract }, hre) => {
    const networkId = hre.network.name;
    console.log(
      "Reading data from VRF contract ",
      contract,
      " on network ",
      networkId
    );

    const result = await hre.readRandomNumber(hre, contract);
    console.log("Random Number is: ", result);
    if (
      result == "0" &&
      ["hardhat", "localhost", "ganache"].indexOf(hre.network.name) == 0
    ) {
      console.log(
        "You'll either need to wait another minute, or fix something!"
      );
    }
    if (["hardhat", "localhost", "ganache"].indexOf(hre.network.name) >= 0) {
      console.log(
        "You'll have to manually update the value since you're on a local chain!"
      );
    }
  });
