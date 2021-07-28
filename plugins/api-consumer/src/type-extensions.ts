// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/config" {

  // We extendr the UserConfig type, which represents the config as writen
  // by the users. Things are normally optional here.
  export interface ProjectPathsUserConfig {
  }

  // We also extend the Config type, which represents the configuration
  // after it has been resolved. This is the type used during the execution
  // of tasks, tests and scripts.
  // Normally, you don't want things to be optional here. As you can apply
  // default values using the extendConfig function.
  export interface ProjectPathsConfig {
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    readData: (hre: HardhatRuntimeEnvironment, contractAddress: string) => Promise<string>
    requestData: (hre: HardhatRuntimeEnvironment, contractAddress: string) => Promise<string>
  }
}
