import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import AppBody from "@/components/app_body";
import Footer from "@/components/footer";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box>
    <Navigation />
    <AppBody>{children}</AppBody>
    <Footer />
  </Box>
);

export default Layout;
