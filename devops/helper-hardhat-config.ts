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
