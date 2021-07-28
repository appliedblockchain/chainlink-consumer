import "@nomiclabs/hardhat-ethers"
import { extendEnvironment } from 'hardhat/config';

import readData from "./read-data";
import requestData from "./request-data";

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

extendEnvironment((hre) => {
  hre.readData = readData
  hre.requestData = requestData
})
