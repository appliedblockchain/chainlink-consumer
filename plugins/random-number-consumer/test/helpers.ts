import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { resetHardhatContext } from "hardhat/plugins-testing";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import path from "path";

chai.use(chaiAsPromised);

declare module "mocha" {
  interface Context {
    hre: HardhatRuntimeEnvironment;
  }
}

export function useEnvironment(): void {
  beforeEach("Loading hardhat environment", function () {
    process.chdir(path.join(__dirname, "fixture"));

    this.hre = require("hardhat");
  });

  afterEach("Resetting hardhat", function () {
    resetHardhatContext();
  });
}
