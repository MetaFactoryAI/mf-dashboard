import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal, { IProviderOptions } from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

type Web3ContextType = {
  account: null | string;
  provider: null | ethers.providers.Web3Provider;
  errors: unknown;
};

const providerOptions: IProviderOptions = {
  // limited only to Rinkeby for now
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: "https://rinkeby.infura.io/v3/a2eae6b8a91442c8a6e3fe5e8c4ef4bd",
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
  loading: false,
  connectWeb3: () => null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [{ account, provider, errors }, setWeb3State] = useState<Web3ContextType>({
    account: null,
    provider: null,
    errors: null,
  });

  const connectWeb3 = useCallback(async () => {
    try {
      const web3ModalInstance = web3Modal && (await web3Modal.connect());
      const web3Provider = new Web3(web3ModalInstance)
        .currentProvider as ethers.providers.ExternalProvider;
      const currentprovider = new ethers.providers.Web3Provider(web3Provider);
      const currentAccount = await currentprovider.getSigner().getAddress();

      web3ModalInstance.on("accountsChanged", async (newAcc: string[]) =>
        setWeb3State((prev) => ({ ...prev, account: newAcc[0] })),
      );

      setWeb3State({ provider: currentprovider, account: currentAccount, errors: null });
    } catch (e) {
      setWeb3State({ provider: null, account: null, errors: e });
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
        loading,
        connectWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);
