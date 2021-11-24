import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal, { IProviderOptions } from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

type Web3ContextType = {
  account: null | string;
  provider: null | ethers.providers.Web3Provider;
};

const providerOptions: IProviderOptions = {
  // limited only to Rinkeby for now
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: 'https://rinkeby.infura.io/v3/a2eae6b8a91442c8a6e3fe5e8c4ef4bd',
      },
    },
  },
};

const web3Modal = typeof window !== 'undefined' && new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

const Web3Context = createContext<
  Web3ContextType & { loading: boolean, connectWeb3:() => void }
    >({
      account: null,
      provider: null,
      loading: false,
      connectWeb3: () => null,
    });

const Web3ContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [{ account, provider }, setWeb3State] = useState<Web3ContextType>({
    account: null,
    provider: null,
  });

  const connectWeb3 = useCallback(async () => {
    const modalProvider = await web3Modal.connect();
    const currentprovider = new ethers.providers.Web3Provider(
      new Web3(modalProvider).currentProvider as ethers.providers.ExternalProvider,
    );
    const currentAccount = await currentprovider.getSigner().getAddress();
    const isApproved = await isAccountApproved(currentAccount, currentprovider);
    if (!isApproved) await approve(currentprovider);

    modalProvider.on('accountsChanged', async (newAcc: string[]) => setWeb3State((prev) => ({ ...prev, account: newAcc[0] })));

    setWeb3State({ provider: currentprovider, account: currentAccount });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

    // eslint-disable-next-line no-unused-expressions
    web3Modal.cachedProvider ? connectWeb3() : setLoading(false);
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        account, provider, loading, connectWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => useContext(Web3Context);

export default Web3ContextProvider;
