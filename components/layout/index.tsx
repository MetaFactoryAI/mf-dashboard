import React, { ReactNode, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { LOGO_HEIGHT } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loading, account, isValidChain } = useWeb3Context();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!account || !isValidChain()) && router.pathname !== "/") {
      router.push("/");
    }
  }, [account, isValidChain, loading, router]);

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
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
