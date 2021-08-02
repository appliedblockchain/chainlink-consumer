import React, { FunctionComponent, useState } from "react";
import { useContext } from "react";

import Address from "../components/Address";
import DisplayAsyncValue from "../components/DisplayAsyncValue";
import PageTitle from "../components/PageTitle";
import usePriceConsumer from "../hooks/usePriceConsumer";
import { BlockchainContext } from "../providers/BlockchainProvider";

const PriceConsumer: FunctionComponent = () => {
  const [address, setAddress] = useState("");
  const { provider } = useContext(BlockchainContext)
  const {
    latestPrice,
    latestPriceCallError,
    getLatestPrice,
  } = usePriceConsumer(provider, address);

  return (
    <div>
      <PageTitle>Price consumer</PageTitle>
      <Address address={address} setAddress={setAddress} />
      {address && (
        <DisplayAsyncValue
          label="Latest Price"
          value={latestPrice}
          error={latestPriceCallError}
          refresh={getLatestPrice}
        />
      )}
    </div>
  );
};

export default PriceConsumer;
