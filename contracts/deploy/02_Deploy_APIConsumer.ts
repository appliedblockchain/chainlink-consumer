import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig } from "../helper-hardhat-config";

const DeployAPI: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  ethers,
}) => {
  let linkToken;
  let MockOracle;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let linkTokenAddress;
  let oracle;
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  if (chainId == "31337") {
    linkToken = await get("LinkToken");
    MockOracle = await get("MockOracle");
    linkTokenAddress = linkToken.address;
    oracle = MockOracle.address;
  } else {
    linkTokenAddress = networkConfig[chainId]["linkToken"];
    oracle = networkConfig[chainId]["oracle"];
  }
  const jobId = networkConfig[chainId]["jobId"];
  const fee = networkConfig[chainId]["fee"];
  const networkName = networkConfig[chainId]["name"];

  const apiConsumer = await deploy("APIConsumer", {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress],
    log: true,
  });

  log("Run API Consumer contract with following command:");
  log(
    "npx hardhat request-data --contract " +
      apiConsumer.address +
      " --network " +
      networkName
  );
  log("----------------------------------------------------");
};

DeployAPI.tags = ["all", "api", "main"];

export default DeployAPI;
