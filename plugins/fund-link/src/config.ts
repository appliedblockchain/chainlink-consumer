type NetworkConfiguration = {
  name: string;
  linkToken?: string;
  fundAmount: string;
};

const networkConfig: {
  [key: string]: NetworkConfiguration;
} = {
  default: {
    name: "hardhat",
    fundAmount: "1000000000000000000",
  },
  "31337": {
    name: "localhost",
    fundAmount: "1000000000000000000",
  },
  "42": {
    name: "kovan",
    linkToken: "0xa36085F69e2889c224210F603D836748e7dC0088",
    fundAmount: "1000000000000000000",
  },
  "4": {
    name: "rinkeby",
    linkToken: "0x01be23585060835e02b77ef475b0cc51aa1e0709",
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
    fundAmount: "0",
  },
  "80001": {
    name: "mumbai",
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    fundAmount: "0",
  },
  "56": {
    name: "bsc",
    linkToken: "0x404460c6a5ede2d891e8297795264fde62adbb75",
    fundAmount: "0",
  },
  "97": {
    name: "bsc-testnet",
    linkToken: "0x84b9b910527ad5c03a9ca831909e21e236ea7b06",
    fundAmount: "0",
  },
  "43114": {
    name: "avalanche",
    linkToken: "0x5947BB275c521040051D82396192181b413227A3",
    fundAmount: "0",
  },
  "43113": {
    name: "avalanche-fuji",
    linkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    fundAmount: "0",
  },
  "30": {
    name: "rsk",
    linkToken: "0x14adae34bef7ca957ce2dde5add97ea050123827",
    fundAmount: "0",
  },
  "100": {
    name: "xdai",
    linkToken: "0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2",
    fundAmount: "0",
  },
  "250": {
    name: "fantom",
    linkToken: "0x6F43FF82CCA38001B6699a8AC47A2d0E66939407",
    fundAmount: "0",
  },
  "4002": {
    name: "fantom-testnet",
    linkToken: "0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F",
    fundAmount: "0",
  },
  "421611": {
    name: "arbitrum-rinkeby",
    linkToken: "0x615fBe6372676474d9e6933d310469c9b68e9726",
    fundAmount: "0",
  },
  "128": {
    name: "huobi",
    linkToken: "0x9e004545c59D359F6B7BFB06a26390b087717b42",
    fundAmount: "0",
  },
  "10": {
    name: "optimism",
    linkToken: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
    fundAmount: "0",
  },
  "69": {
    name: "optimism-kovan",
    linkToken: "0x4911b761993b9c8c0d14Ba2d86902AF6B0074F5B",
    fundAmount: "0",
  },
};

export const getNetworkIdFromName = async (networkIdName: string) => {
  for (const id in networkConfig) {
    if (networkConfig[id]["name"] == networkIdName) {
      return id;
    }
  }
  return null;
};

export default networkConfig;
