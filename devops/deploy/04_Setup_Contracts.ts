import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig, autoFundCheck } from "../helper-hardhat-config";

const SetupContracts: DeployFunction = async ({
  deployments,
  getChainId,
  run,
  web3,
  ethers,
}) => {
  let linkToken;
  const { log, get } = deployments;
  const chainId = await getChainId();
  let linkTokenAddress;
  let additionalMessage = "";
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);
  const networkName = networkConfig[chainId]["name"];

  if (chainId == "31337") {
    linkToken = await get("LinkToken");
    linkTokenAddress = linkToken.address;
    additionalMessage = " --linkaddress " + linkTokenAddress;
  } else {
    linkTokenAddress = networkConfig[chainId]["linkToken"];
  }

  //Try Auto-fund APIConsumer contract with LINK
  const APIConsumer = await deployments.get("APIConsumer");

  if (
    linkTokenAddress &&
    (await autoFundCheck(
      getChainId,
      web3,
      ethers,
      APIConsumer.address,
      networkName,
      linkTokenAddress,
      additionalMessage
    ))
  ) {
    await run("fund-link", {
      contract: APIConsumer.address,
      linkaddress: linkTokenAddress,
    });
  } else {
    log("Then run API Consumer contract with following command:");
    log(
      "npx hardhat request-data --contract " +
        APIConsumer.address +
        " --network " +
        networkName
    );
  }
  log("----------------------------------------------------");

  //Now try Auto-fund VRFConsumer contract

  const RandomNumberConsumer = await deployments.get("RandomNumberConsumer");

  if (
    linkTokenAddress &&
    (await autoFundCheck(
      getChainId,
      web3,
      ethers,
      RandomNumberConsumer.address,
      networkName,
      linkTokenAddress,
      additionalMessage
    ))
  ) {
    await run("fund-link", {
      contract: RandomNumberConsumer.address,
      linkaddress: linkTokenAddress,
    });
  } else {
    log("Then run RandomNumberConsumer contract with the following command:");
    log(
      "npx hardhat request-random-number --contract " +
        RandomNumberConsumer.address +
        " --network " +
        networkName
    );
  }
  log("----------------------------------------------------");
};

SetupContracts.tags = ["all"];

export default SetupContracts;
