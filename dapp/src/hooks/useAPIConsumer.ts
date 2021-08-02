import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

import getAPIConsumerContract from "../lib/getAPIConsumerContract";

interface APIConsumerHookState {
  volume: string
  volumeCallError: string
  getVolume: () => Promise<void>
}

const useAPIConsumer = (provider: ethers.providers.Web3Provider | undefined, address: string): APIConsumerHookState => {
  const [volume, setVolume] = useState("");
  const [volumeCallError, setVolumeCallError] = useState("");

  const getVolume = useCallback(() => {
    return getAPIConsumerContract(provider, address)
      .volume()
      .then((res: ethers.BigNumber) => res.toString())
      .then(setVolume)
      .catch((e: Error) => {
        console.error(e);
        setVolumeCallError("Invalid api consumer contract address.");
      });
  }, [address, provider]);

  useEffect(() => {
    if (!address) {
      return;
    }

    setVolume("");
    setVolumeCallError("");

    getVolume();
  }, [address, getVolume]);

  return {
    volume,
    volumeCallError,
    getVolume,
  };
};

export default useAPIConsumer;
