import { useState } from "react";

import getRandomNumberConsumer from "../lib/getRandomNumberConsumerContract";

const useRequestRandomNumber = (address: string) => {
  const [
    requestRandomNumberCallError,
    setRequestRandomNumberCallError,
  ] = useState("");
  const [requestRandomNumberTxHash, setRequestRandomNumberTxHash] = useState(
    ""
  );
  const requestNewRandomNumber = async () => {
    if (!address) {
      return;
    }

    try {
      setRequestRandomNumberCallError("");
      const tx = await getRandomNumberConsumer(address).getRandomNumber();
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
