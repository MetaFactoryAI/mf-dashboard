import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "../../styles/Header.module.css";

export const Header = () => (
  <Box className={styles.header}>
    <Link href="/">
      <a className={styles.logo}>
        <Image src="/header-logo-mf.svg" width="48px" height="48px" />
      </a>
    </Link>
  </Box>
);
