import { TransactionResponse } from "@ethersproject/providers";
import "hardhat/types/config";
import "hardhat/types/runtime";
declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    readRandomNumber: (
      hre: HardhatRuntimeEnvironment,
      contractAddress: string
    ) => Promise<string>;
    requestRandomNumber: (
      hre: HardhatRuntimeEnvironment,
      contractAddress: string
    ) => Promise<TransactionResponse>;
  }
}
