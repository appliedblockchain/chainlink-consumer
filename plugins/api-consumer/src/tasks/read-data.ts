import { task } from "hardhat/config";

task(
  "read-data",
  "Calls an API Consumer Contract to read data obtained from an external API"
)
  .addParam(
    "contract",
    "The address of the API Consumer contract that you want to call"
  )
  .setAction(async ({ contract }, hre) => {
    const networkId = hre.network.name;
    console.log(
      "Reading data from API Consumer contract ",
      contract,
      " on network ",
      networkId
    );

    const result = await hre.readData(hre, contract);

    console.log("Data is: ", result);
    if (
      result === "0" &&
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
