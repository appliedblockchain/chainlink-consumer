import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";
import Web3 from "web3";
import ERC667ABI from "@appliedblockchain/chainlink-contracts/abi/ERC677.json";

interface NetworkConfig {
  name: string;
  fee?: string;
  keyHash?: string;
  jobId?: string;
  fundAmount?: string;
  linkToken?: string;
  ethUsdPriceFeed?: string;
  vrfCoordinator?: string;
  oracle?: string;
}

export const networkConfig: { [key: string]: NetworkConfig } = {
  default: {
    name: "hardhat",
    fee: "100000000000000000",
    keyHash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
  },
  "31337": {
    name: "localhost",
    fee: "100000000000000000",
    keyHash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
  },
  "42": {
    name: "kovan",
    linkToken: "0xa36085F69e2889c224210F603D836748e7dC0088",
    ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    keyHash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    vrfCoordinator: "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9",
    oracle: "0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fee: "100000000000000000",
    fundAmount: "1000000000000000000",
  },
  "4": {
    name: "rinkeby",
    linkToken: "0x01be23585060835e02b77ef475b0cc51aa1e0709",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    keyHash:
      "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311",
    vrfCoordinator: "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B",
    oracle: "0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e",
    jobId: "6d1bfe27e7034b1d87b5270556b17277",
    fee: "100000000000000000",
    fundAmount: "1000000000000000000",
  },
  "1": {
    name: "mainnet",
    linkToken: "0x514910771af9ca656af840dff83e8264ecf986ca",
    fundAmount: "0",
  },
  "5": {
    name: "goerli",
    linkToken: "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    fundAmount: "0",
  },
  "137": {
    name: "polygon",
    linkToken: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    keyHash:
      "0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da",
    vrfCoordinator: "0x3d2341ADb2D31f1c5530cDC622016af293177AE0",
    fee: "100000000000000",
    fundAmount: "1000000000000000000",
  },
  "80001": {
    name: "mumbai",
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    keyHash:
      "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4",
    vrfCoordinator: "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255",
    fee: "100000000000000",
    fundAmount: "1000000000000000000",
  },
  "56": {
    name: "bsc",
    linkToken: "0x404460c6a5ede2d891e8297795264fde62adbb75",
    ethUsdPriceFeed: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
    keyHash:
      "0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c",
    vrfCoordinator: "0x747973a5A2a4Ae1D3a8fDF5479f1514F65Db9C31",
    fee: "200000000000000000",
    fundAmount: "2000000000000000000",
  },
  "97": {
    name: "bsc-testnet",
    linkToken: "0x84b9b910527ad5c03a9ca831909e21e236ea7b06",
    ethUsdPriceFeed: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7",
    keyHash:
      "0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186",
    vrfCoordinator: "0xa555fC018435bef5A13C6c6870a9d4C11DEC329C",
    fee: "100000000000000000",
    fundAmount: "1000000000000000000",
  },
  "43114": {
    name: "avalanche",
    linkToken: "0x5947BB275c521040051D82396192181b413227A3",
    ethUsdPriceFeed: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
    fundAmount: "1000000000000000000",
  },
  "43113": {
    name: "avalanche-fuji",
    linkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    ethUsdPriceFeed: "0x86d67c3D38D2bCeE722E601025C25a575021c6EA",
    fundAmount: "1000000000000000000",
  },
  "30": {
    name: "rsk",
    linkToken: "0x14adae34bef7ca957ce2dde5add97ea050123827",
    fundAmount: "1000000000000000000",
  },
  "100": {
    name: "xdai",
    linkToken: "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2",
    ethUsdPriceFeed: "0xa767f745331D267c7751297D982b050c93985627",
    fundAmount: "1000000000000000000",
  },
  "250": {
    name: "fantom",
    linkToken: "0x6F43FF82CCA38001B6699a8AC47A2d0E66939407",
    ethUsdPriceFeed: "0x11DdD3d147E5b83D01cee7070027092397d63658",
    fundAmount: "1000000000000000000",
  },
  "4002": {
    name: "fantom-testnet",
    linkToken: "0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F",
    ethUsdPriceFeed: "0xB8C458C957a6e6ca7Cc53eD95bEA548c52AFaA24",
    fundAmount: "1000000000000000000",
  },
  "421611": {
    name: "arbitrum-rinkeby",
    linkToken: "0x615fBe6372676474d9e6933d310469c9b68e9726",
    ethUsdPriceFeed: "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8",
    fundAmount: "1000000000000000000",
  },
  "128": {
    name: "huobi",
    linkToken: "0x9e004545c59D359F6B7BFB06a26390b087717b42",
    ethUsdPriceFeed: "0x5Fa530068e0F5046479c588775c157930EF0Dff0",
    fundAmount: "1000000000000000000",
  },
  "10": {
    name: "optimism",
    linkToken: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
    ethUsdPriceFeed: "0xA969bEB73d918f6100163Cd0fba3C586C269bee1",
    fundAmount: "1000000000000000000",
  },
  "69": {
    name: "optimism-kovan",
    linkToken: "0x4911b761993b9c8c0d14Ba2d86902AF6B0074F5B",
    ethUsdPriceFeed: "0xCb7895bDC70A1a1Dce69b689FD7e43A627475A06",
    fundAmount: "1000000000000000000",
  },
};

export const developmentChains = ["hardhat", "localhost"];

export const getNetworkFromName = (
  networkIdName: string | number
): NetworkConfig | undefined => {
  for (const id in networkConfig) {
    if (networkConfig[id]["name"] == networkIdName) {
      return networkConfig[id];
    }
  }
  return;
};

type Ethers = typeof ethers & HardhatEthersHelpers;

export const autoFundCheck = async (
  getChainId: () => Promise<string>,
  web3: Web3,
  ethers: Ethers,
  contractAddr: string,
  networkName: string,
  linkTokenAddress: string,
  additionalMessage: string
): Promise<boolean> => {
  const chainId = await getChainId();
  console.log("Checking to see if contract can be auto-funded with LINK:");
  const chainConfig = networkConfig[chainId];

  if (!networkConfig || !chainConfig.fundAmount) {
    return false;
  }

  const amount = web3.utils.toBN(chainConfig.fundAmount);
  //check to see if user has enough LINK
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  const linkTokenContract = new ethers.Contract(
    linkTokenAddress,
    ERC667ABI,
    signer
  );
  const balanceHex = await linkTokenContract.balanceOf(signer.address);
  const balance = await web3.utils.toBN(balanceHex._hex);
  const contractBalanceHex = await linkTokenContract.balanceOf(contractAddr);
  const contractBalance = await web3.utils.toBN(contractBalanceHex._hex);
  if (
    balance > amount &&
    amount > web3.utils.toBN(0) &&
    contractBalance < amount
  ) {
    //user has enough LINK to auto-fund
    //and the contract isn't already funded
    return true;
  } else {
    //user doesn't have enough LINK, print a warning
    console.log(
      "Account doesn't have enough LINK to fund contracts, or you're deploying to a network where auto funding isnt' done by default"
    );
    console.log(
      "Please obtain LINK via the faucet at https://" +
        networkName +
        ".chain.link/, then run the following command to fund contract with LINK:"
    );
    console.log(
      "npx hardhat fund-link --contract " +
        contractAddr +
        " --network " +
        networkName +
        additionalMessage
    );
    return false;
  }
};
