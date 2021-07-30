task("read-price-feed", "Gets the latest price from a Chainlink Price Feed")
  .addParam(
    "contract",
    "The address of the Price Feed consumer contract that you want to read"
  )
  .setAction(async ({ contract }, hre) => {
    const networkId = hre.network.name

    console.log("Reading data from Price Feed consumer contract ", contract, " on network ", networkId)

    await hre.readPriceFeed(hre, contract).then((data) => {
      console.log("Price is: ", BigInt(data).toString());
    });
  });

module.exports = {};
