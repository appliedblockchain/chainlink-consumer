import { ethers } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";

interface ConnectWalletHookState {
  isConnectingWallet: boolean
  selectedAddress: string
  networkError: string
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  dismissNetworkError: () => void
  installMetamask: () => void
  chainID: string
  metamaskInstalled: boolean
  provider?: ethers.providers.Web3Provider
}

const useConnectWallet = (): ConnectWalletHookState => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isConnectingWallet, setConnectingWallet] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [chainID, setChainID] = useState("");
  const onboarding = useRef<MetaMaskOnboarding>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      onboarding.current.stopOnboarding()
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    }
  }, []);

  async function connectWallet() {
    try {
      if (!window.ethereum.request) {
        return
      }

      setConnectingWallet(true);

      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setSelectedAddress(address);

      setConnectingWallet(false);
    } catch (err) {
      setConnectingWallet(false)
    }
  }

  const checkNetwork = useCallback(async function () {
    try {
      if (!window.ethereum.request) {
        return
      }

      const newChainID = await window.ethereum.request({
        method: "net_version",
      });
      setChainID(newChainID);
      setNetworkError("");
      return true;
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function disconnectWallet() {
    setSelectedAddress("");
  }

  function dismissNetworkError() {
    setNetworkError("");
  }

  useEffect(() => {
    if (!provider) {
      return
    }

    // We reinitialize it whenever the user changes their account.
    provider.on("accountsChanged", ([newAddress]: string[]) => {
      checkNetwork();

      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return setSelectedAddress("");
      }

      setSelectedAddress(newAddress);
    });

    // We reset the dapp state if the network is changed
    provider.on("chainChanged", () => {
      checkNetwork();
      setSelectedAddress("");
      connectWallet();
    });

    connectWallet();
    checkNetwork();
  }, [provider, checkNetwork])

  const installMetamask = () => {
    onboarding.current?.startOnboarding()
  }

  return {
    isConnectingWallet,
    selectedAddress,
    networkError,
    connectWallet,
    disconnectWallet,
    dismissNetworkError,
    installMetamask,
    chainID,
    metamaskInstalled: MetaMaskOnboarding.isMetaMaskInstalled(),
    provider
  };
};

export default useConnectWallet;
