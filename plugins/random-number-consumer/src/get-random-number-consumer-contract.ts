import { HardhatRuntimeEnvironment } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import RandomNumberConsumerABI from '@chainlink-consumer/contracts/abi/RandomNumberConsumer.json'

export default (ethers: HardhatRuntimeEnvironment["ethers"], contractAddr: string, signer: SignerWithAddress) => {
  return new ethers.Contract(contractAddr, RandomNumberConsumerABI, signer)
}
