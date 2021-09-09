// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";
import "hardhat/types/runtime";
import { FundLinkReceipt } from "./types";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    fundLink: (
      hre: HardhatRuntimeEnvironment,
      contractAddress: string,
      fundAmount?: string,
      linkAddress?: string
    ) => Promise<FundLinkReceipt>;
  }
}
