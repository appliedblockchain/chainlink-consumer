import React, { FunctionComponent } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

interface Props {
  address: string;
  setAddress: (address: string) => void;
}

const Address: FunctionComponent<Props> = ({ address, setAddress }) => {
  return (
    <FormGroup className="mb-2">
      <FormLabel>Contract Address</FormLabel>
      <FormControl
        placeholder="0x..."
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </FormGroup>
  );
};

export default Address;
