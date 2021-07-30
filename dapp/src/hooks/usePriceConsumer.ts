import PriceConsumerV3ABI from "@chainlink-consumer/contracts/abi/PriceConsumerV3.json";
import { Contract, ethers } from "ethers";
// import { PriceConsumerV3__factory } from '@chainlink-consumer/contracts/types/factories/PriceConsumerV3__factory';
import { useCallback, useEffect, useState } from "react";

function getPriceConsumer(address: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return new Contract(address, PriceConsumerV3ABI, provider?.getSigner(0));
  // priceConsumer = PriceConsumerV3Factory.connect("0x916c131fcb12C961c291b325d7CF250EDdBc78Dd", window.ethereum)
}

const usePriceConsumer = (address: string) => {
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
