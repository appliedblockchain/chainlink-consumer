import { BigNumber } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import getRandomNumberConsumerContract from './get-random-number-consumer-contract'

export default async (hre: HardhatRuntimeEnvironment, contractAddr: string) => {
  const accounts = await hre.ethers.getSigners()
  const signer = accounts[0]
  const vrfConsumerContract = getRandomNumberConsumerContract(hre.ethers, contractAddr, signer)
  return BigNumber.from(await vrfConsumerContract.randomResult()).toString()
}
