import APIConsumerABI from "@chainlink-consumer/contracts/abi/APIConsumer.json";
import { Contract, ethers } from "ethers";

export default function getApiConsumerContract(provider: ethers.providers.Web3Provider | undefined, address: string): Contract {
  return new Contract(address, APIConsumerABI, provider?.getSigner(0));
}
