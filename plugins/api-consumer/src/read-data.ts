import { HardhatRuntimeEnvironment } from "hardhat/types";

import getApiConsumerContract from "./get-api-consumer-contract";

export default async (
  hre: HardhatRuntimeEnvironment,
  contractAddr: string
): Promise<string> => {
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const apiConsumerContract = getApiConsumerContract(contractAddr, signer);

  return hre.ethers.BigNumber.from(
    await apiConsumerContract.volume()
  ).toString();
};
