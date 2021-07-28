import "@nomiclabs/hardhat-ethers"
import { extendEnvironment } from 'hardhat/config';

import readRandomNumber from "./read-random-number";
import requestRandomNumber from "./request-random-number";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

extendEnvironment((hre) => {
  hre.readRandomNumber = readRandomNumber
  hre.requestRandomNumber = requestRandomNumber
})
