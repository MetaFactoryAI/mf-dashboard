import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWeb3Context } from "@/contexts/Web3Context";
import { formatAddress } from "@/utils/presentationHelper";
import { LOGO_HEIGHT } from "@/utils/constants";

const DesktopNavigation: React.FC = () => {
  const router = useRouter();
  const { account, connectWeb3, loading, errors } = useWeb3Context();

  const handleConnect = () => {
    if (!account) {
      connectWeb3();
    }
  };

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
        <a href="https://www.metafactory.ai/" target="_blank" rel="noopener noreferrer">
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
          <a target="_blank" href="https://www.metafactory.ai" rel="noopener noreferrer">
            Home
          </a>
        </Box>
        {/* <Box px="2" bg={router.asPath === "/robot" ? "yellow" : ""}>
          <a target="_blank" href="https://www.metafactory.ai/robots" rel="noopener noreferrer">
            $Robot
          </a>
        </Box> */}
        <Flex px="2" bg={router.asPath === "/shop" ? "yellow" : ""}>
          <Box pr="1">
            <Image src="/arrow.svg" alt="" width="10px" height="10px" />
          </Box>
          <a target="_blank" href="https://shop.metafactory.ai/" rel="noopener noreferrer">
            Shop
          </a>
        </Flex>
      </Flex>
      <Spacer />
      <Flex>
        <Box px="2" bg={router.asPath === "/exchange" ? "yellow" : ""}>
          <Link href="/exchange">Exchange</Link>
        </Box>
        {/* <Box px="2" bg={router.asPath === "/claim" ? "yellow" : ""}>
          <Link href="/claim">Claim</Link>
        </Box> */}
        {account ? (
          <Box px="2" border="1px" bg={router.asPath === "/" ? "yellow" : ""}>
            <Link href="/">
              {!loading && !errors && !!account ? formatAddress(account) : "Connect"}
            </Link>
          </Box>
        ) : (
          <Button
            onClick={handleConnect}
            backgroundColor="yellow"
            border="1px"
            rounded="false"
            _hover={{ bg: "transparent" }}
          >
            Connect
          </Button>
        )}

        <Box width={`${LOGO_HEIGHT}px`} />
      </Flex>
    </Flex>
  );
};

export default DesktopNavigation;
