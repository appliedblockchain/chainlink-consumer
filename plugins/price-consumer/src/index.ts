import "@nomiclabs/hardhat-ethers";
import { extendEnvironment } from "hardhat/config";

import readPriceFeed from "./read-price-feed";
import "./tasks/read-price-feed";
import "./type-extensions";

extendEnvironment((hre) => {
  hre.readPriceFeed = readPriceFeed;
});
