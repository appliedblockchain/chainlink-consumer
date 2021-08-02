import React, { FunctionComponent, useState } from "react";

import Address from "../components/Address";
import DisplayAsyncValue from "../components/DisplayAsyncValue";
import PageTitle from "../components/PageTitle";
import RequestNewValueForm from "../components/RequestNewValueForm";
import useAPIConsumer from "../hooks/useAPIConsumer";
import useAPIConsumerRequestData from "../hooks/useAPIConsumerRequestData";

const APIConsumer: FunctionComponent = () => {
  const [address, setAddress] = useState("");
  const { volume, volumeCallError, getVolume } = useAPIConsumer(address);
  const {
    requestDataCallError,
    requestDataTxHash,
    requestData,
    requestPending,
  } = useAPIConsumerRequestData(address);

  return (
    <div>
      <PageTitle>API Consumer</PageTitle>
      <Address address={address} setAddress={setAddress} />
      {address && (
        <>
          <DisplayAsyncValue
            label="Volume"
            value={volume}
            error={volumeCallError}
            refresh={getVolume}
          />
          <RequestNewValueForm
            requestNewValue={requestData}
            disabled={requestPending}
            error={requestDataCallError}
            txHash={requestDataTxHash}
          />
        </>
      )}
    </div>
  );
};

export default APIConsumer;
