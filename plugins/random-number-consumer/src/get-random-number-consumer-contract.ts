import { Contract } from "ethers";
import RandomNumberConsumerABI from "@appliedblockchain/chainlink-contracts/abi/RandomNumberConsumer.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export default (contractAddr: string, signer: SignerWithAddress): Contract => {
  return new Contract(contractAddr, RandomNumberConsumerABI, signer);
};
