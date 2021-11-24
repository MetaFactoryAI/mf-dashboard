import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const LOGO_HEIGHT = 64;

const Navigation: React.FC = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      height={`${LOGO_HEIGHT}px`}
      fontSize="18px"
    >
      <Box>
        <a href="https://www.metafactory.ai/">
          <Image
            src="/header-logo-mf.svg"
            alt=""
            width={`${LOGO_HEIGHT}px`}
            height={`${LOGO_HEIGHT}px`}
          />
        </a>
      </Box>
      <Flex p="4">
        <Box px="2" bg={currentPath === "/project" ? "yellow" : ""}>
          <Link href="/project">Project</Link>
        </Box>
        <Box px="2" bg={currentPath === "/robot" ? "yellow" : ""}>
          <Link href="/robot">$Robot</Link>
        </Box>
        <Flex px="2" bg={currentPath === "/shop" ? "yellow" : ""}>
          <Box pr="1">
            <Image src="/arrow.svg" alt="" width="10px" height="10px" />
          </Box>
          <Link href="/shop">Shop</Link>
        </Flex>
        <Box px="2" bg={currentPath === "/curate" ? "yellow" : ""}>
          <Link href="/curate">Curate</Link>
        </Box>
      </Flex>
      <Spacer />
      <Flex>
        <Box px="2" bg={currentPath === "/exchange" ? "yellow" : ""}>
          <Link href="/exchange">Exchange</Link>
        </Box>
        <Box px="2" bg={currentPath === "/claim" ? "yellow" : ""}>
          <Link href="/claim">Claim</Link>
        </Box>
        <Box px="2" border="1px" bg={currentPath === "/connect" ? "yellow" : ""}>
          <Link href="/connect">Connect</Link>
        </Box>
        <Box width={`${LOGO_HEIGHT}px`} />
      </Flex>
    </Flex>
  );
};

export default Navigation;
