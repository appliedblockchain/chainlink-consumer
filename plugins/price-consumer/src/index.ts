import "@nomiclabs/hardhat-ethers"
import { extendEnvironment } from 'hardhat/config';

import readPriceFeed from './read-price-feed';

// This import is needed to let the TypeScript compiler know that it should include your type
// extensions in your npm package's types file.
import "./type-extensions";

extendEnvironment((hre) => {
  hre.readPriceFeed = readPriceFeed
})
