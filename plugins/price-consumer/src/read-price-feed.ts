import PriceConsumerV3 from "@chainlink-consumer/contracts/abi/PriceConsumerV3.json";
import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async (hre: HardhatRuntimeEnvironment, contractAddr: string) => {
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];
  const priceFeedConsumerContract = await new hre.ethers.Contract(
    contractAddr,
    PriceConsumerV3,
    signer
  );
  const data = await priceFeedConsumerContract.getLatestPrice();

  return BigNumber.from(data).toString();
};
