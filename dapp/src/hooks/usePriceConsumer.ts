import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import getPriceConsumer from "../lib/getPriceConsumerContract";

interface PriceConsumerHookState {
  latestPrice: string
  latestPriceCallError: string
  getLatestPrice: () => Promise<void>
}

const usePriceConsumer = (address: string): PriceConsumerHookState => {
  const [latestPrice, setLatestPrice] = useState("");
  const [latestPriceCallError, setLatestPriceCallError] = useState("");

  const getLatestPrice = useCallback(() => {
    return getPriceConsumer(address)
      .getLatestPrice()
      .then((res: ethers.BigNumber) => res.toString())
      .then(setLatestPrice)
      .catch((e: Error) => {
        console.error(e);
        setLatestPriceCallError("Invalid price consumer contract address.");
      });
  }, [address]);

  useEffect(() => {
    if (!address) {
      return;
    }

    setLatestPrice("");
    setLatestPriceCallError("");

    getLatestPrice();
  }, [address, getLatestPrice]);

  return { latestPrice, latestPriceCallError, getLatestPrice };
};

export default usePriceConsumer;
