import React, { FunctionComponent, useState } from "react";

import Address from "../components/Address";
import DisplayAsyncValue from "../components/DisplayAsyncValue";
import PageTitle from "../components/PageTitle";
import usePriceConsumer from "../hooks/usePriceConsumer";

const PriceConsumer: FunctionComponent = () => {
  const [address, setAddress] = useState("");
  const {
    latestPrice,
    latestPriceCallError,
    getLatestPrice,
  } = usePriceConsumer(address);

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
