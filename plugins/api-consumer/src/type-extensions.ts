// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";
import "hardhat/types/runtime";
import { TransactionResponse } from "@ethersproject/providers";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    readData: (
      hre: HardhatRuntimeEnvironment,
      contractAddress: string
    ) => Promise<string>;
    requestData: (
      hre: HardhatRuntimeEnvironment,
      contractAddress: string
    ) => Promise<TransactionResponse>;
  }
}
