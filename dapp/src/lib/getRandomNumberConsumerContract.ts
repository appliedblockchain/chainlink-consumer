import RandomNumberConsumerABI from "@chainlink-consumer/contracts/abi/RandomNumberConsumer.json";
import { Contract, ethers } from "ethers";

export default function getRandomNumberConsumer(address: string): Contract {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return new Contract(address, RandomNumberConsumerABI, provider?.getSigner(0));
}
