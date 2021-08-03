import { ethers } from "ethers";
import React, { createContext, FunctionComponent } from "react";

import useConnectWallet from "../hooks/useConnectWallet";

interface ContextFields {
  isConnectingWallet: boolean;
  selectedAddress: string;
  networkError: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  dismissNetworkError: () => void;
  installMetamask: () => void;
  chainID: string;
  metamaskInstalled: boolean;
  provider?: ethers.providers.Web3Provider;
}

const FunctionNotInitialized = () => {
  throw new Error("function not initialized");
};

export const BlockchainContext = createContext<ContextFields>({
  isConnectingWallet: false,
  selectedAddress: "",
  networkError: "",
  connectWallet: FunctionNotInitialized,
  disconnectWallet: FunctionNotInitialized,
  dismissNetworkError: FunctionNotInitialized,
  installMetamask: FunctionNotInitialized,
  chainID: "",
  metamaskInstalled: false,
  provider: undefined,
});

const BlockchainProvider: FunctionComponent = ({ children }) => {
  const { Provider } = BlockchainContext;
  const blockchainState = useConnectWallet();

  return <Provider value={blockchainState}>{children}</Provider>;
};

export default BlockchainProvider;
