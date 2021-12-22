import React, { ReactNode } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { LOGO_HEIGHT } from "@/utils/constants";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Flex flexDirection="column" minH="100vh">
    <Navigation />
    <Flex
      flex="1"
      flexDirection="column"
      mx={{ base: "24px", sm: "24px", md: `${LOGO_HEIGHT}px`, lg: `${LOGO_HEIGHT}px` }}
      border={{ base: "0px", sm: "00px", md: "2px", lg: "2px" }}
      marginBlockEnd="20px"
    >
      <Spacer />
      {children}
      <Spacer />
    </Flex>
    <Footer />
  </Flex>
);

export default Layout;
