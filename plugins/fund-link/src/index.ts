import "@nomiclabs/hardhat-ethers";
import { extendEnvironment } from "hardhat/config";

import fundLink from "./fund-link";
import "./tasks/fund-link";
import "./type-extensions";

extendEnvironment((hre) => {
  hre.fundLink = fundLink;
});
