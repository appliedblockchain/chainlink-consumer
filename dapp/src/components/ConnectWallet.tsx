import React from "react";
import { Button } from "react-bootstrap";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

interface Props {
  connectWallet: () => Promise<void>;
  networkError: string | undefined;
  dismiss: () => void;
}

export function ConnectWallet({ connectWallet, networkError, dismiss }: Props) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <Button
            variant="dark"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}
