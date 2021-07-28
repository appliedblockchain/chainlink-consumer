import { assert, expect } from "chai";
import LinkTokenABI from '@chainlink-consumer/contracts/abi/LinkToken.json'
import LinkTokenBytecode from '@chainlink-consumer/contracts/bytecode/LinkToken.json'
import APIConsumerABI from '@chainlink-consumer/contracts/abi/APIConsumer.json'
import APIConsumerBytecode from '@chainlink-consumer/contracts/bytecode/APIConsumer.json'
import MockOracleABI from '@chainlink-consumer/contracts/abi/MockOracle.json'
import MockOracleBytecode from '@chainlink-consumer/contracts/bytecode/MockOracle.json'

import { useEnvironment } from "./helpers";
import { Contract } from "@ethersproject/contracts";

const JOB_ID = "29fa9aa13bf1468788b7cc4a500a45b8"
const FEE = "100000000000000000"
const FUND_AMOUNT = "1000000000000000000"

describe("Integration", function () {

  describe("random-number", function () {
    useEnvironment();
    let apiConsumerContract: Contract

    beforeEach(async function () {
      const { ethers } = this.hre

      const accounts = await ethers.getSigners()
      const signer = accounts[0]

      const linkTokenDeployer = new ethers.ContractFactory(LinkTokenABI, LinkTokenBytecode, signer)
      const linkToken = await linkTokenDeployer.deploy()
      await linkToken.deployTransaction.wait()

      const mockOracleDeployer = new ethers.ContractFactory(MockOracleABI, MockOracleBytecode, signer)
      const mockOracle = await mockOracleDeployer.deploy(linkToken.address)
      await mockOracle.deployTransaction.wait()

      const APIConsumerDeployer = new ethers.ContractFactory(APIConsumerABI, APIConsumerBytecode, signer)
      apiConsumerContract = await APIConsumerDeployer.deploy(mockOracle.address, JOB_ID, FEE, linkToken.address)
      await apiConsumerContract.deployTransaction.wait()

      const transferTx = await linkToken.transfer(apiConsumerContract.address, FUND_AMOUNT)
      await transferTx.wait()
    })

    it('Should throw an error if an invalid api consumer contract address is passed', function () {
      return assert.isRejected(this.hre.readData(this.hre, "dummy address"))
    })


    it('Should return 0 if no data was requested', async function () {
      const data = await this.hre.readData(this.hre, apiConsumerContract.address)

      expect(data).to.be.equal('0')
    })
  })

});
