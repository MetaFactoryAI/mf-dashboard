import React, { ReactNode, useCallback } from "react";
import { Flex } from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useNetwork, useAccount, useConnect } from "wagmi";
import Connect from "@/components/profile/Connect";
import InvalidChain from "@/components/profile/InvalidChain";
import { Loading } from "@/components/atoms";
import { useRouter } from "next/router";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeChain, isLoading: isNetworkLoading } = useNetwork();
  const { data: account, isLoading } = useAccount();
  const { isConnecting } = useConnect();
  const { pathname } = useRouter();

  const renderResult = useCallback(() => {
    const isValidChain = activeChain?.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID);
    if (pathname === "/closet_wearable_detail/[id]") {
      return children;
    }
    if (isLoading || isNetworkLoading || isConnecting) {
      return <Loading />;
    }

    if (!isLoading && !account) {
      return <Connect />;
    }

    if (!isValidChain) {
      return <InvalidChain />;
    }

    return children;
  }, [account, activeChain?.id, children, isConnecting, isLoading, isNetworkLoading, pathname]);

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
        {renderResult()}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
