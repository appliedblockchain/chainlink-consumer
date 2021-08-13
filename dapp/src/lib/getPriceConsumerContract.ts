import { PriceConsumerV3 } from "@appliedblockchain/chainlink-contracts/types/PriceConsumerV3.d";
import PriceConsumerV3ABI from "@appliedblockchain/chainlink-contracts/abi/PriceConsumerV3.json";
import { Contract, ethers } from "ethers";

export default function getPriceConsumer(
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): PriceConsumerV3 {
  return new Contract(
    address,
    PriceConsumerV3ABI,
    provider?.getSigner(0)
  ) as PriceConsumerV3;
}
