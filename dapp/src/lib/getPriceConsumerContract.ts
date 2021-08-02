import PriceConsumerV3ABI from "@chainlink-consumer/contracts/abi/PriceConsumerV3.json";
import { Contract, ethers } from "ethers";

export default function getPriceConsumer(address: string): Contract {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return new Contract(address, PriceConsumerV3ABI, provider?.getSigner(0));
}
