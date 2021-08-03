import RandomNumberConsumerABI from "@chainlink-consumer/contracts/abi/APIConsumer.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

export default (contractAddr: string, signer: SignerWithAddress): Contract => {
  return new Contract(contractAddr, RandomNumberConsumerABI, signer);
};
