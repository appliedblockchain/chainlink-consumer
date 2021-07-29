import "@nomiclabs/hardhat-ethers";
import { extendEnvironment } from "hardhat/config";

import readRandomNumber from "./read-random-number";
import requestRandomNumber from "./request-random-number";
import "./type-extensions";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.

extendEnvironment((hre) => {
  hre.readRandomNumber = readRandomNumber;
  hre.requestRandomNumber = requestRandomNumber;
});
