import React from "react";
import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

import NetworkErrorMessage from "./NetworkErrorMessage";

interface Props {
  connectWallet: () => Promise<void>;
  networkError: string | undefined;
  dismiss: () => void;
  metamaskInstalled: boolean
  installMetamask: () => void
}

const ConnectWallet: FunctionComponent<Props> = ({ connectWallet, networkError, dismiss, metamaskInstalled, installMetamask }) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          {
            metamaskInstalled ?
              <>
                <p>Please connect to your wallet.</p>
                <Button
                  variant="dark"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </> :
              <Button
                variant="dark"
                onClick={installMetamask}
              >
                Install Metamask
              </Button>
          }
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet
