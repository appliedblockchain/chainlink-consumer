import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig } from "../helper-hardhat-config";

const DeployRandomNumber: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}) => {
  let linkToken;
  let VRFCoordinatorMock;
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let linkTokenAddress;
  let vrfCoordinatorAddress;
  let additionalMessage = "";

  if (chainId == "31337") {
    linkToken = await get("LinkToken");
    VRFCoordinatorMock = await get("VRFCoordinatorMock");
    linkTokenAddress = linkToken.address;
    vrfCoordinatorAddress = VRFCoordinatorMock.address;
    additionalMessage = " --linkaddress " + linkTokenAddress;
  } else {
    linkTokenAddress = networkConfig[chainId]["linkToken"];
    vrfCoordinatorAddress = networkConfig[chainId]["vrfCoordinator"];
  }
  const keyHash = networkConfig[chainId]["keyHash"];
  const fee = networkConfig[chainId]["fee"];

  const randomNumberConsumer = await deploy("RandomNumberConsumer", {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true,
  });

  log("Run the following command to fund contract with LINK:");
  log(
    "npx hardhat fund-link --contract " +
      randomNumberConsumer.address +
      " --network " +
      networkConfig[chainId]["name"] +
      additionalMessage
  );
  log("Then run RandomNumberConsumer contract with the following command");
  log(
    "npx hardhat request-random-number --contract " +
      randomNumberConsumer.address +
      " --network " +
      networkConfig[chainId]["name"]
  );
  log("----------------------------------------------------");
};

DeployRandomNumber.tags = ["all", "vrf"];

export default DeployRandomNumber;
