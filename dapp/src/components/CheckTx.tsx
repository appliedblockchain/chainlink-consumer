import React, { useContext } from "react";

import { BlockchainContext } from "../providers/BlockchainProvider";

const explorers: { [chainID: string]: string } = {
  "42": "https://kovan.etherscan.io",
  "3": "https://ropstein.etherscan.io",
  "1": "https://etherscan.io",
  "4": "https://rinkeby.etherscan.io",
  "5": "https://goerli.etherscan.io",
};

interface Props {
  txHash: string;
}

const CheckTx = ({ txHash }: Props) => {
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
