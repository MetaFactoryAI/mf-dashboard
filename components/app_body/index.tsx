import React, { ReactNode } from "react";
import { Center } from "@chakra-ui/layout";
import styles from "./index.module.css";
import { LOGO_HEIGHT } from "@/components/navigation";

const AppBody: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Center mx={`${LOGO_HEIGHT}px`} className={styles.body}>
    {children}
  </Center>
);

export default AppBody;
