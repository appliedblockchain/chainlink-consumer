import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import getPriceConsumer from "../lib/getPriceConsumerContract";

interface PriceConsumerHookState {
  latestPrice: string
  latestPriceCallError: string
  getLatestPrice: () => Promise<void>
}

const usePriceConsumer = (provider: ethers.providers.Web3Provider | undefined, address: string): PriceConsumerHookState => {
  const [latestPrice, setLatestPrice] = useState("");
  const [latestPriceCallError, setLatestPriceCallError] = useState("");

  const getLatestPrice = useCallback(() => {
    return getPriceConsumer(provider, address)
      .getLatestPrice()
      .then((res: ethers.BigNumber) => res.toString())
      .then(setLatestPrice)
      .catch((e: Error) => {
        console.error(e);
        setLatestPriceCallError("Invalid price consumer contract address.");
      });
  }, [address, provider]);

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
