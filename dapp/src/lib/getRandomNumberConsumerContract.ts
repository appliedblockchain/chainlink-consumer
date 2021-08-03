import RandomNumberConsumerABI from "@chainlink-consumer/contracts/abi/RandomNumberConsumer.json";
import { Contract, ethers } from "ethers";

export default function getRandomNumberConsumer(
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): Contract {
  return new Contract(address, RandomNumberConsumerABI, provider?.getSigner(0));
}
