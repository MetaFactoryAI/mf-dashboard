import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWeb3Context } from "@/contexts/Web3Context";
import { formatAddress } from "@/utils/presentationHelper";

export const LOGO_HEIGHT = 64;

const Navigation: React.FC = () => {
  const router = useRouter();
  const { account, loading, errors } = useWeb3Context();

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
        <Box px="2" bg={router.asPath === "/project" ? "yellow" : ""}>
          <Link href="/project">Project</Link>
        </Box>
        <Box px="2" bg={router.asPath === "/robot" ? "yellow" : ""}>
          <Link href="/robot">$Robot</Link>
        </Box>
        <Flex px="2" bg={router.asPath === "/shop" ? "yellow" : ""}>
          <Box pr="1">
            <Image src="/arrow.svg" alt="" width="10px" height="10px" />
          </Box>
          <Link href="/shop">Shop</Link>
        </Flex>
        <Box px="2" bg={router.asPath === "/curate" ? "yellow" : ""}>
          <Link href="/curate">Curate</Link>
        </Box>
      </Flex>
      <Spacer />
      <Flex>
        <Box px="2" bg={router.asPath === "/exchange" ? "yellow" : ""}>
          <Link href="/exchange">Exchange</Link>
        </Box>
        <Box px="2" bg={router.asPath === "/claim" ? "yellow" : ""}>
          <Link href="/claim">Claim</Link>
        </Box>
        <Box px="2" border="1px" bg={router.asPath.indexOf("/connect") >= 0 ? "yellow" : ""}>
          {!loading && !errors && !!account && (
            <Link href="/connected">{formatAddress(account)}</Link>
          )}
          {!loading && !account && <Link href="/connect">Connect</Link>}
        </Box>
        <Box width={`${LOGO_HEIGHT}px`} />
      </Flex>
    </Flex>
  );
};

export default Navigation;
