import React, { FunctionComponent, useContext } from "react";

import { BlockchainContext } from "../providers/BlockchainProvider";

const explorers: { [chainID: string]: string } = {
  "42": "https://kovan.etherscan.io",
  "3": "https://ropstein.etherscan.io",
  "1": "https://etherscan.io",
  "4": "https://rinkeby.etherscan.io",
  "5": "https://goerli.etherscan.io",
  "137": "https://polygonscan.com",
  "80001": "https://mumbai.polygonscan.com",
  "56": "https://bscscan.com",
  "97": "https://testnet.bscscan.com",
  "43114": "https://snowtrace.io",
  "43113": "https://testnet.snowtrace.io",
  "30": "https://explorer.rsk.co",
  "100": "https://blockscout.com/xdai/mainnet",
  "250": "https://ftmscan.com",
  "4002": "https://testnet.ftmscan.com",
  "421611": "https://testnet.arbiscan.io",
  "128": "https://hecoscan.xyz",
  "10": "https://optimistic.etherscan.io",
  "69": "https://kovan-optimistic.etherscan.io",
};

interface Props {
  txHash: string;
}

const CheckTx: FunctionComponent<Props> = ({ txHash }) => {
  const { chainID } = useContext(BlockchainContext);

  return (
    <div>
      {explorers[chainID] ? (
        <a
          href={`${explorers[chainID]}/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          See the transaction progress on explorer.
        </a>
      ) : (
        <span>Waiting for confirmation.</span>
      )}
    </div>
  );
};

export default CheckTx;
