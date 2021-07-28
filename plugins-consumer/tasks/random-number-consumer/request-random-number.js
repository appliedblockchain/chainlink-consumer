task(
  "request-random-number",
  "Requests a random number for a Chainlink VRF enabled smart contract"
)
  .addParam(
    "contract",
    "The address of the API Consumer contract that you want to call"
  )
  .setAction(async ({ contract }, hre) => {
    const networkId = network.name;
    console.log(
      "Requesting a random number using VRF consumer contract ",
      contract,
      " on network ",
      networkId
    );

    var result = await hre.requestRandomNumber(hre, contract);
    console.log(
      "Contract ",
      contract,
      " random number request successfully called. Transaction Hash: ",
      result.hash
    );
    console.log("Run the following to read the returned random number:");
    console.log(
      "npx hardhat read-random-number --contract " +
        contract +
        " --network " +
        network.name
    );
  });

module.exports = {};
