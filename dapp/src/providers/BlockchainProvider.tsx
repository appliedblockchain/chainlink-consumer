import React, { createContext, FunctionComponent } from "react";

import useConnectWallet from "../hooks/useConnectWallet";

interface ContextFields {
  isConnectingWallet: boolean;
  selectedAddress: string;
  networkError: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  dismissNetworkError: () => void;
  chainID: string;
}

export const BlockchainContext = createContext<ContextFields>({
  isConnectingWallet: false,
  selectedAddress: "",
  networkError: "",
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  dismissNetworkError: async () => {},
  chainID: "",
});

const BlockchainProvider: FunctionComponent = ({ children }) => {
  const { Provider } = BlockchainContext;
  const blockchainState = useConnectWallet();

  return <Provider value={blockchainState}>{children}</Provider>;
};

export default BlockchainProvider;
