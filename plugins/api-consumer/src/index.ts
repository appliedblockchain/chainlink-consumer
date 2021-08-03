import "@nomiclabs/hardhat-ethers";
import { extendEnvironment } from "hardhat/config";

import readData from "./read-data";
import requestData from "./request-data";
import "./tasks";
import "./type-extensions";

extendEnvironment((hre) => {
  hre.readData = readData;
  hre.requestData = requestData;
});
