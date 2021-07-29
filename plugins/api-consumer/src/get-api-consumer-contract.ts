import RandomNumberConsumerABI from "@chainlink-consumer/contracts/abi/APIConsumer.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default (
  ethers: HardhatRuntimeEnvironment["ethers"],
  contractAddr: string,
  signer: SignerWithAddress
) => {
  return new ethers.Contract(contractAddr, RandomNumberConsumerABI, signer);
};
