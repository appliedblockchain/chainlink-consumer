import React from "react";
import { Button } from "react-bootstrap";

import CheckTx from "./CheckTx";
import ErrorMessage from "./ErrorMessage";

interface Props {
  requestNewValue: () => void;
  disabled: boolean;
  error: string;
  txHash: string;
}

const RequestNewValueForm = ({
  requestNewValue,
  disabled,
  error,
  txHash,
}: Props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();

      if (disabled) {
        return;
      }

      requestNewValue();
    }}
  >
    <Button variant="dark" disabled={disabled} onClick={requestNewValue}>
      Request New Random Number
    </Button>
    <br />
    <ErrorMessage>{error}</ErrorMessage>
    {txHash && <CheckTx txHash={txHash} />}
  </form>
);

export default RequestNewValueForm;
