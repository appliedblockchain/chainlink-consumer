import APIConsumerABI from "@chainlink-consumer/contracts/abi/APIConsumer.json";
import { Contract, ethers } from "ethers";

export default function getApiConsumerContract(address: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return new Contract(address, APIConsumerABI, provider?.getSigner(0));
}
