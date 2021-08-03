import React, { FunctionComponent, useState } from "react";
import { useContext } from "react";

import Address from "../components/Address";
import DisplayAsyncValue from "../components/DisplayAsyncValue";
import PageTitle from "../components/PageTitle";
import RequestNewValueForm from "../components/RequestNewValueForm";
import useAPIConsumer from "../hooks/useAPIConsumer";
import useAPIConsumerRequestData from "../hooks/useAPIConsumerRequestData";
import { BlockchainContext } from "../providers/BlockchainProvider";

const APIConsumer: FunctionComponent = () => {
  const [address, setAddress] = useState("");
  const { provider } = useContext(BlockchainContext);
  const { volume, volumeCallError, getVolume } = useAPIConsumer(
    provider,
    address
  );
  const {
    requestDataCallError,
    requestDataTxHash,
    requestData,
    requestPending,
  } = useAPIConsumerRequestData(provider, address);

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
