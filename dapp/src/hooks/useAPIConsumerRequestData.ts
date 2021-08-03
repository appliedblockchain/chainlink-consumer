import { ethers } from "ethers";
import { useState } from "react";

import getAPIConsumerContract from "../lib/getAPIConsumerContract";

interface APIConsumerRequestDataHookState {
  requestData: () => Promise<void>;
  requestDataCallError: string;
  requestDataTxHash: string;
  requestPending: boolean;
}

const useAPIConsumerRequestData = (
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): APIConsumerRequestDataHookState => {
  const [requestDataCallError, setRequestDataCallError] = useState("");
  const [requestDataTxHash, setRequestDataTxHash] = useState("");
  const [requestPending, setRequestPending] = useState(false);
  const requestData = async () => {
    if (!address) {
      return;
    }

    try {
      setRequestPending(true);
      setRequestDataCallError("");
      const apiConsumer = getAPIConsumerContract(provider, address);

      const tx = await apiConsumer.requestVolumeData();
      await tx.wait();
      setRequestDataTxHash(tx.hash);
      setRequestPending(false);
    } catch (e) {
      console.error(e);
      setRequestDataCallError(e.message);
    }
  };

  return {
    requestData,
    requestDataCallError,
    requestDataTxHash,
    requestPending,
  };
};

export default useAPIConsumerRequestData;
