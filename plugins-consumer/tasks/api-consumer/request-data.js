task("request-data", "Calls an API Consumer Contract to request external data")
  .addParam(
    "contract",
    "The address of the API Consumer contract that you want to call"
  )
  .setAction(async ({ contract }, hre) => {
    console.log(
      "Calling API Consumer contract ",
      contract,
      " on network ",
      network.name
    );

    const result = await hre.requestData(hre, contract);

    console.log(
      "Contract ",
      contract,
      " external data request successfully called. Transaction Hash: ",
      result.hash
    );
    console.log("Run the following to read the returned result:");
    console.log(
      "npx hardhat read-data --contract " +
        contract +
        " --network " +
        network.name
    );
  });
module.exports = {};
