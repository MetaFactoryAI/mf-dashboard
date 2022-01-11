import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal, { IProviderOptions } from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const EthDater = require("ethereum-block-by-date");

type Web3ContextType = {
  account: null | string;
  provider: null | ethers.providers.Web3Provider;
  dater: null | unknown;
  errors: unknown;
};

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: "https://main-light.eth.linkpool.io",
      },
    },
  },
};

const web3Modal =
  typeof window !== "undefined" &&
  new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

const Web3Context = createContext<Web3ContextType & { loading: boolean; connectWeb3: () => void }>({
  errors: null,
  account: null,
  provider: null,
  dater: null,
  loading: true,
  connectWeb3: () => null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [{ account, provider, dater, errors }, setWeb3State] = useState<Web3ContextType>({
    account: null,
    provider: null,
    dater: null,
    errors: null,
  });

  const connectWeb3 = useCallback(async () => {
    try {
      const web3ModalInstance = web3Modal && (await web3Modal.connect());
      const web3Provider = new Web3(web3ModalInstance)
        .currentProvider as ethers.providers.ExternalProvider;
      const currentprovider = new ethers.providers.Web3Provider(web3Provider);
      const currentAccount = await currentprovider.getSigner().getAddress();
      const currentDater = new EthDater(currentprovider);
      web3ModalInstance.on("accountsChanged", async (newAcc: string[]) =>
        setWeb3State((prev) => ({ ...prev, account: newAcc[0] })),
      );

      setWeb3State({
        provider: currentprovider,
        account: currentAccount,
        dater: currentDater,
        errors: null,
      });
    } catch (e) {
      setWeb3State({ provider: null, account: null, dater: null, errors: e });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

    if (web3Modal && web3Modal.cachedProvider) {
      connectWeb3();
    } else {
      setLoading(false);
    }
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        errors,
        account,
        provider,
        dater,
        loading,
        connectWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
