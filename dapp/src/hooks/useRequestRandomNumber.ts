import { ethers } from "ethers";
import { useState } from "react";

import getRandomNumberConsumer from "../lib/getRandomNumberConsumerContract";

interface RequestRandomNumberHookState {
  requestNewRandomNumber: () => Promise<void>;
  requestRandomNumberCallError: string;
  requestRandomNumberTxHash: string;
}

const useRequestRandomNumber = (
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): RequestRandomNumberHookState => {
  const [requestRandomNumberCallError, setRequestRandomNumberCallError] =
    useState("");
  const [requestRandomNumberTxHash, setRequestRandomNumberTxHash] =
    useState("");
  const requestNewRandomNumber = async () => {
    if (!address) {
      return;
    }

    try {
      setRequestRandomNumberCallError("");
      const tx = await getRandomNumberConsumer(
        provider,
        address
      ).getRandomNumber();
      await tx.wait();
      setRequestRandomNumberTxHash(tx.hash);
    } catch (e) {
      console.error(e);
      setRequestRandomNumberCallError(e.message);
    }
  };

  return {
    requestNewRandomNumber,
    requestRandomNumberCallError,
    requestRandomNumberTxHash,
  };
};

export default useRequestRandomNumber;
