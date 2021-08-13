import { RandomNumberConsumer } from "@appliedblockchain/chainlink-contracts/types/RandomNumberConsumer.d";
import RandomNumberConsumerABI from "@appliedblockchain/chainlink-contracts/abi/RandomNumberConsumer.json";
import { Contract, ethers } from "ethers";

export default function getRandomNumberConsumer(
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): RandomNumberConsumer {
  return new Contract(
    address,
    RandomNumberConsumerABI,
    provider?.getSigner(0)
  ) as RandomNumberConsumer;
}
