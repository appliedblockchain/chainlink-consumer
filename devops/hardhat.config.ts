/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "@appliedblockchain/chainlink-plugins-api-consumer";
import "@appliedblockchain/chainlink-plugins-price-consumer";
import "@appliedblockchain/chainlink-plugins-random-number-consumer";
import "@appliedblockchain/chainlink-plugins-fund-link";

import "./tasks/accounts";
import "./tasks/balance";
import "./tasks/withdraw-link";
import "./tasks/block-number";
import "./tasks/block-number";

require("dotenv").config();

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key";
const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL ||
  "https://eth-rinkeby.alchemyapi.io/v2/your-api-key";
const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  "https://eth-kovan.alchemyapi.io/v2/qDK0PvoVPRUMt99Z6r71gXp7wjiPx2HF";
const POLYGON_RPC_URL =
  process.env.POLYGON_RPC_URL ||
  "https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key";
const MUMBAI_RPC_URL =
  process.env.MUMBAI_RPC_URL ||
  "https://polygon-mumbai.g.alchemyapi.io/v2/your-api-key";
const BSC_RPC_URL =
  process.env.BSC_RPC_URL ||
  "https://bsc-dataseed.binance.org";
const BSC_TESTNET_RPC_URL =
  process.env.BSC_TESTNET_RPC_URL ||
  "https://data-seed-prebsc-1-s1.binance.org:8545";
const AVALANCHE_RPC_URL =
  process.env.AVALANCHE_RPC_URL ||
  "https://api.avax.network/ext/bc/C/rpc";
const AVALANCHE_FUFI_RPC_URL =
  process.env.AVALANCHE_FUFI_RPC_URL ||
  "https://api.avax-test.network/ext/bc/C/rpc";
const RSK_RPC_URL =
  process.env.RSK_RPC_URL ||
  "https://public-node.rsk.co";
const XDAI_RPC_URL =
  process.env.XDAI_RPC_URL ||
  "https://rpc.xdaichain.com";
const FANTOM_RPC_URL =
  process.env.FANTOM_RPC_URL ||
  "https://rpc.ftm.tools";
const FANTOM_TESTNET_RPC_URL =
  process.env.FANTOM_TESTNET_RPC_URL ||
  "https://rpc.testnet.fantom.network";
const HUOBI_RPC_URL =
  process.env.HUOBI_RPC_URL ||
  "https://http-mainnet-node.huobichain.com";
const ARBITRUM_RINKEBY_RPC_URL =
  process.env.ARBITRUM_RINKEBY_RPC_URL ||
  "https://arb-rinkeby.g.alchemy.com/v2/your-api-key";
const OPTIMISM_RPC_URL =
  process.env.OPTIMISM_RPC_URL ||
  "https://opt-mainnet.g.alchemy.com/v2/your-api-key";
const OPTIMISM_KOVAN_RPC_URL =
  process.env.OPTIMISM_KOVAN_RPC_URL ||
  "https://opt-kovan.g.alchemy.com/v2/your-api-key";
const MNEMONIC = process.env.MNEMONIC || "your mnemonic";
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "Your etherscan API key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your private key";

export default {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: MAINNET_RPC_URL
      // }
    },
    localhost: {},
    main: {
      url: MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      // accounts: {
      //   mnemonic: MNEMONIC,
      // },
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY],
      // accounts: {
      //   mnemonic: MNEMONIC,
      // },
      saveDeployments: true,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    polygon: {
      url: POLYGON_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    bsc: {
      url: BSC_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    'bsc-testnet': {
      url: BSC_TESTNET_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    avalanche: {
      url: AVALANCHE_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    'avalanche-fufi': {
      url: AVALANCHE_FUFI_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    rsk: {
      url: RSK_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    xdai: {
      url: XDAI_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    fantom: {
      url: FANTOM_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    'fantom-testnet': {
      url: FANTOM_TESTNET_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    huobi: {
      url: HUOBI_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    'arbitrum-rinkeby': {
      url: ARBITRUM_RINKEBY_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    'optimism': {
      url: OPTIMISM_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    'optimism-kovan': {
      url: OPTIMISM_KOVAN_RPC_URL,
      // accounts: [PRIVATE_KEY],
      accounts: {
        mnemonic: MNEMONIC,
      },
      saveDeployments: true,
    },
    ganache: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
  },
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
  external: {
    contracts: [
      {
        artifacts:
          "../node_modules/@appliedblockchain/chainlink-contracts/artifacts",
      },
      {
        artifacts:
          "./node_modules/@appliedblockchain/chainlink-contracts/artifacts",
      },
    ],
  },
};