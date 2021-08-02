import PriceConsumerV3ABI from "@chainlink-consumer/contracts/abi/PriceConsumerV3.json";
import { Contract, ethers } from "ethers";

export default function getPriceConsumer(provider: ethers.providers.Web3Provider | undefined, address: string): Contract {
  return new Contract(address, PriceConsumerV3ABI, provider?.getSigner(0));
}
