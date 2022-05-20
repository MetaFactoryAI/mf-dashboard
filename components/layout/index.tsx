import React, { ReactNode, useEffect } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { LOGO_HEIGHT, CHAIN_ID } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loading, account, chainId } = useWeb3Context();
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !account && router.pathname !== "/") {
      router.push("/");
    }

    if (!loading && account && chainId !== CHAIN_ID) {
      toast({
        title: "Please select Ethereum mainnet network",
        status: "error",
        isClosable: true,
      });
    }
  }, [account, chainId, loading, router, toast]);

  return (
    <Flex flexDirection="column" height="100vh">
      <Navigation />
      <Flex
        flex="1"
        flexDirection="column"
        mx={{ base: "0px", sm: "0px", md: `${LOGO_HEIGHT}px`, lg: `${LOGO_HEIGHT}px` }}
        border={{ base: "0px", sm: "0px", md: "2px", lg: "2px" }}
        marginBlockEnd="20px"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
