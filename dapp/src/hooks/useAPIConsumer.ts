import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

import getAPIConsumerContract from "../lib/getAPIConsumerContract";

const useAPIConsumer = (address: string) => {
  const [volume, setVolume] = useState("");
  const [volumeCallError, setVolumeCallError] = useState("");

  const getVolume = useCallback(() => {
    return getAPIConsumerContract(address)
      .volume()
      .then((res: ethers.BigNumber) => res.toString())
      .then(setVolume)
      .catch((e: Error) => {
        console.error(e);
        setVolumeCallError("Invalid api consumer contract address.");
      });
  }, [address]);

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
