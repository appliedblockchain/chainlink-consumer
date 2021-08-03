/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-deploy";

import "./tasks/export-bytecode";

export default {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    flat: true,
    spacing: 2,
  },
  bytecodeExporter: {
    path: "./bytecode",
    clear: true,
    flat: true,
    spacing: 2,
  },
  typechain: {
    outDir: "types",
  },
};
