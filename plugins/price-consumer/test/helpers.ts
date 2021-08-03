import chaiAsPromised from "chai-as-promised";
import { resetHardhatContext } from "hardhat/plugins-testing";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import path from "path";
import chai from "chai";

chai.use(chaiAsPromised);
declare module "mocha" {
  interface Context {
    hre: HardhatRuntimeEnvironment;
  }
}

export function useEnvironment(): void {
  beforeEach("Loading hardhat environment", async function () {
    process.chdir(path.join(__dirname, "fixture"));

    this.hre = await import("hardhat");
  });

  afterEach("Resetting hardhat", function () {
    resetHardhatContext();
  });
}
