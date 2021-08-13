import { APIConsumer } from "@appliedblockchain/chainlink-contracts/types/APIConsumer";
import APIConsumerABI from "@appliedblockchain/chainlink-contracts/abi/APIConsumer.json";
import { Contract, ethers } from "ethers";

export default function getApiConsumerContract(
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): APIConsumer {
  return new Contract(
    address,
    APIConsumerABI,
    provider?.getSigner(0)
  ) as APIConsumer;
}
