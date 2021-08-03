import { TransactionResponse } from "@ethersproject/providers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import getApiConsumerContract from "./get-api-consumer-contract";

export default async (
  hre: HardhatRuntimeEnvironment,
  contractAddr: string
): Promise<TransactionResponse> => {
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const apiConsumerContract = getApiConsumerContract(contractAddr, signer);
  const result = await apiConsumerContract.requestVolumeData();
  const receipt = await result.wait();

  return receipt;
};
