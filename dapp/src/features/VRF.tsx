import React, { FunctionComponent, useState } from "react";

import Address from "../components/Address";
import DisplayAsyncValue from "../components/DisplayAsyncValue";
import PageTitle from "../components/PageTitle";
import RequestNewValueForm from "../components/RequestNewValueForm";
import useRandomNumber from "../hooks/useRandomNumber";
import useRequestRandomNumber from "../hooks/useRequestRandomNumber";

const VRF: FunctionComponent = () => {
  const [address, setAddress] = useState("");
  const {
    randomResult,
    randomResultCallError,
    getRandomNumber,
  } = useRandomNumber(address);
  const {
    requestNewRandomNumber,
    requestRandomNumberCallError,
    requestRandomNumberTxHash,
  } = useRequestRandomNumber(address);

  return (
    <div>
      <PageTitle>VRF</PageTitle>
      <Address address={address} setAddress={setAddress} />
      {address && (
        <>
          <DisplayAsyncValue
            label="Random Number"
            value={randomResult}
            error={randomResultCallError}
            refresh={getRandomNumber}
          />
          <RequestNewValueForm
            requestNewValue={requestNewRandomNumber}
            disabled={!!(!address || randomResultCallError)}
            error={requestRandomNumberCallError}
            txHash={requestRandomNumberTxHash}
          />
        </>
      )}
    </div>
  );
};

export default VRF;
