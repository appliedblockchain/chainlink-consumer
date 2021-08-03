import "@nomiclabs/hardhat-ethers";
import { extendEnvironment } from "hardhat/config";

import readRandomNumber from "./read-random-number";
import requestRandomNumber from "./request-random-number";
import "./tasks";
import "./type-extensions";

extendEnvironment((hre) => {
  hre.readRandomNumber = readRandomNumber;
  hre.requestRandomNumber = requestRandomNumber;
});
