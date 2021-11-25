import React, { ReactNode } from "react";
import { Center, Box } from "@chakra-ui/react";
import styles from "./index.module.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { LOGO_HEIGHT } from "@/utils/constants";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box>
    <Navigation />
    <Center mx={`${LOGO_HEIGHT}px`} className={styles.body}>
      {children}
    </Center>
    <Footer />
  </Box>
);

export default Layout;
