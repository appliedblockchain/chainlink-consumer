import { useCallback, useEffect, useState } from "react";

const useConnectWallet = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isConnectingWallet, setConnectingWallet] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [chainID, setChainID] = useState("");

  async function connectWallet() {
    try {
      setConnectingWallet(true);

      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setSelectedAddress(address);

      setConnectingWallet(false);
    } catch (err) {
      console.log(err);
    }
  }

  const checkNetwork = useCallback(async function () {
    try {
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

  // We reinitialize it whenever the user changes their account.
  window.ethereum.on("accountsChanged", ([newAddress]: string[]) => {
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
  window.ethereum.on("chainChanged", () => {
    checkNetwork();
    setSelectedAddress("");
    connectWallet();
  });

  useEffect(() => {
    connectWallet();
    checkNetwork();
  }, [checkNetwork]);

  return {
    isConnectingWallet,
    selectedAddress,
    networkError,
    connectWallet,
    disconnectWallet,
    dismissNetworkError,
    chainID,
  };
};

export default useConnectWallet;
