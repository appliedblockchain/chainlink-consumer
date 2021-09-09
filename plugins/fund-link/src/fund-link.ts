import LinkTokenInterface from "@appliedblockchain/chainlink-contracts/abi/LinkTokenInterface.json";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import networkConfig, { getNetworkIdFromName } from "./config";
import { FundLinkReceipt } from "./types";

export default async (
  hre: HardhatRuntimeEnvironment,
  contractAddr: string,
  fundAmt?: string,
  linkAddr?: string
): Promise<FundLinkReceipt> => {
  const networkName = hre.network.name;
  let networkId = await getNetworkIdFromName(networkName);

  if (!networkId || !(networkId in networkConfig)) {
    throw new Error(
      `The network with the name "${networkName}" is not supported.`
    );
  }

  const fundAmount = fundAmt || networkConfig[networkId].fundAmount;

  let linkTokenAddress = linkAddr || networkConfig[networkId].linkToken;

  if (!linkTokenAddress) {
    throw new Error("Please provide the Link contract address.");
  }

  //Get signer information
  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];

  //Create connection to LINK token contract and initiate the transfer
  const linkTokenContract = new hre.ethers.Contract(
    linkTokenAddress,
    LinkTokenInterface,
    signer
  );

  try {
    var transferTransaction = await linkTokenContract.transfer(
      contractAddr,
      fundAmount
    );
  } catch (_) {
    throw new Error('Transfer failed. Check whether the Link address is valid or whether your account has enough funds.')
  }

  await transferTransaction.wait(1);

  return {
    amount: fundAmount,
    transactionHash: transferTransaction.hash,
  };
};
