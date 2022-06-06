import React, { ReactNode, useCallback } from "react";
import { Flex } from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { LOGO_HEIGHT, CHAIN_ID } from "@/utils/constants";
import { useNetwork, useAccount } from "wagmi";
import Connect from "@/components/profile/Connect";
import InvalidChain from "@/components/profile/InvalidChain";
import { Loading } from "@/components/atoms";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeChain, isLoading: isNetworkLoading } = useNetwork();
  const { data: account, isLoading } = useAccount();

  const renderResult = useCallback(() => {
    const isValidChain = activeChain?.id === CHAIN_ID;

    if (isLoading || isNetworkLoading) return <Loading />;

    if (!isLoading && !account) {
      return <Connect />;
    }

    if (!isValidChain) {
      return <InvalidChain />;
    }

    return children;
  }, [account, activeChain, children, isLoading, isNetworkLoading]);

  return (
    <Flex flexDirection="column" minHeight="100vh" height="100%" background="background">
      <Navigation />
      <Flex
        flex="1"
        flexDirection="column"
        mx={{ base: "0px", sm: "0px", md: `${LOGO_HEIGHT}px`, lg: `${LOGO_HEIGHT}px` }}
        border={{ base: "0px", sm: "0px", md: "2px", lg: "2px" }}
        background="background"
      >
        {renderResult()}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
