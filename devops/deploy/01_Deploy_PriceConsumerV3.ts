import { getNetworkFromName, networkConfig } from "../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/dist/types";

const DeployPriceConsumer: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let priceFeedAddress;
  if (chainId == "31337") {
    const EthUsdAggregator = await deployments.get("EthUsdAggregator");
    priceFeedAddress = EthUsdAggregator.address;
  } else if (chainId === "1001") {
    priceFeedAddress = networkConfig[chainId]["linkKlayPriceFeed"]
  } else {
    const networkConfig = getNetworkFromName(chainId);
    priceFeedAddress = networkConfig?.ethUsdPriceFeed;
  }
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  // Default one below is ETH/USD contract on Kovan
  log("----------------------------------------------------");
  const priceConsumerV3 = await deploy("PriceConsumerV3", {
    from: deployer,
    args: [priceFeedAddress],
    log: true,
  });
  log("Run Price Feed contract with command:");
  log(
    "npx hardhat read-price-feed --contract " +
      priceConsumerV3.address +
      " --network " +
      networkConfig[chainId]["name"]
  );
  log("----------------------------------------------------");
};

DeployPriceConsumer.tags = ["all", "feed", "main"];

export default DeployPriceConsumer;
