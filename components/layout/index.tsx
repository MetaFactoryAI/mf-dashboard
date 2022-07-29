import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useNetwork, useAccount, useConnect, useSignMessage } from "wagmi";
import Connect from "@/components/profile/Connect";
import InvalidChain from "@/components/profile/InvalidChain";
import { Loading } from "@/components/atoms";
import { useRouter } from "next/router";
import generateSignMessage from "@/utils/auth/helper";
import Cookies from "js-cookie";
import { Base64 } from "js-base64";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeChain, isLoading: isNetworkLoading } = useNetwork();
  const { data: account, isLoading } = useAccount();
  const { isConnecting } = useConnect();
  const { pathname } = useRouter();
  const [authBearer, setAuthBearer] = React.useState(
    Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || ""),
  );
  const [signInMessage, setSignInMessage] = React.useState("");
  const { data, isIdle, signMessage } = useSignMessage();
  const { isConnected } = useConnect();

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showConnect, setShowConnect] = useState<boolean>(false);
  const [showInvalidChain, setShowInvalidChain] = useState<boolean>(false);
  const [showChildren, setShowChildren] = useState<boolean>(false);

  useEffect(() => {
    const isValidChain = activeChain?.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID);

    setShowChildren(false);
    setShowLoading(false);
    setShowConnect(false);
    setShowInvalidChain(false);
    setShowChildren(false);

    if (pathname === "/closet_wearable_detail/[id]") {
      setShowChildren(true);
    } else if (isLoading || isNetworkLoading || isConnecting) {
      setShowLoading(true);
    } else if ((!isLoading && !account) || !authBearer) {
      setShowConnect(true);
    } else if (!isValidChain) {
      setShowInvalidChain(true);
    } else {
      setShowChildren(true);
    }
  }, [account, activeChain?.id, authBearer, isConnecting, isLoading, isNetworkLoading, pathname]);

  // sign auth bearer logic
  // ///////////////////////
  useEffect(() => {
    if (!authBearer && isConnected && isIdle && account?.address) {
      const message = generateSignMessage(account.address);
      signMessage({
        message,
      });
      setSignInMessage(message);
    }
  }, [account, signMessage, isIdle, authBearer, isConnected]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const token = Base64.encode(JSON.stringify([data, signInMessage]));
      setAuthBearer(token);
      Cookies.set(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "", token);
    }
  }, [data, signInMessage]);
  // ///////////////////////
  // sign auth bearer logic

  return (
    <Flex flexDirection="column" minHeight="100vh" height="100%" background="background">
      <Navigation />
      <Flex
        flex="1"
        flexDirection="column"
        mx={{
          base: "0px",
          sm: "0px",
          md: `${process.env.NEXT_PUBLIC_LOGO_HEIGHT}px`,
          lg: `${process.env.NEXT_PUBLIC_LOGO_HEIGHT}px`,
        }}
        border={{ base: "0px", sm: "0px", md: "2px", lg: "2px" }}
        background="background"
      >
        {showChildren && children}
        {showInvalidChain && <InvalidChain />}
        {showLoading && <Loading />}
        {showConnect && <Connect />}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
