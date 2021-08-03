import { TransactionResponse } from "@ethersproject/providers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import getRandomNumberConsumerContract from "./get-random-number-consumer-contract";

export default async (
  hre: HardhatRuntimeEnvironment,
  contractAddr: string
): Promise<TransactionResponse> => {
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const vrfConsumerContract = getRandomNumberConsumerContract(
    contractAddr,
    signer
  );
  const result = await vrfConsumerContract.getRandomNumber();
  const receipt = await result.wait();

  return receipt;
};
