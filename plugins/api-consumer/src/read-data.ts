import { BigNumber } from 'ethers/lib/ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import getApiConsumerContract from './get-api-consumer-contract'

export default async (hre: HardhatRuntimeEnvironment, contractAddr: string) => {
  const accounts = await hre.ethers.getSigners()
  const signer = accounts[0]
  const apiConsumerContract = getApiConsumerContract(hre.ethers, contractAddr, signer)
  return BigNumber.from(await apiConsumerContract.volume()).toString()
}
