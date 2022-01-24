import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal, { IProviderOptions } from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Cookies from "js-cookie";
import { createToken, verifyToken } from "@/utils/auth/web3JWT";
import { APP_NAME } from "@/utils/constants";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const EthDater = require("ethereum-block-by-date");

type Web3ContextType = {
  account: null | string;
  accountAuthBearer: null | string;
  provider: null | ethers.providers.Web3Provider;
  dater: null | unknown;
  errors: unknown;
};

const AUTH_TOKEN_KEY = "authToken";

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: "https://c44896c1e1ba4af98ee36d4acf6c0d7a.eth.rpc.rivet.cloud",
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
  accountAuthBearer: null,
  provider: null,
  dater: null,
  loading: true,
  connectWeb3: () => null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [{ account, provider, dater, errors, accountAuthBearer }, setWeb3State] =
    useState<Web3ContextType>({
      account: null,
      accountAuthBearer: null,
      provider: null,
      dater: null,
      errors: null,
    });

  const generateAuthToken = async (currentProvider: ethers.providers.Web3Provider) => {
    const token = await createToken(currentProvider, APP_NAME);
    const result = await verifyToken(token, currentProvider, APP_NAME);
console.log(result)
console.log('xxxxx')
    Cookies.set(AUTH_TOKEN_KEY, token);

    return token;
  };

  const connectWeb3 = useCallback(async () => {
    try {
      const web3ModalInstance = web3Modal && (await web3Modal.connect());
      const web3Provider = new Web3(web3ModalInstance)
        .currentProvider as ethers.providers.ExternalProvider;
      const currentprovider = new ethers.providers.Web3Provider(web3Provider);
      const currentAccount = await currentprovider.getSigner().getAddress();
      const currentDater = new EthDater(currentprovider);
      const storedAuthToken = Cookies.get(AUTH_TOKEN_KEY);

      web3ModalInstance.on("accountsChanged", async (newAcc: string[]) => {
        const generatedAuthToken = await generateAuthToken(currentprovider);

        setWeb3State((prev) => ({
          ...prev,
          account: newAcc[0],
          accountAuthBearer: generatedAuthToken,
        }));
      });

      setWeb3State({
        provider: currentprovider,
        accountAuthBearer: storedAuthToken || (await generateAuthToken(currentprovider)),
        account: currentAccount,
        dater: currentDater,
        errors: null,
      });
    } catch (e) {
      setWeb3State({
        provider: null,
        accountAuthBearer: null,
        account: null,
        dater: null,
        errors: e,
      });
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
        accountAuthBearer,
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
