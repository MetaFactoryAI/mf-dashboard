import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWeb3Context } from "@/contexts/Web3Context";
import { formatAddress } from "@/utils/presentationHelper";
import { LOGO_HEIGHT } from "@/utils/constants";

const DesktopNavigation: React.FC = () => {
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
          <Link href="https://www.metafactory.ai/project">Project</Link>
        </Box>
        <Box px="2" bg={router.asPath === "/robot" ? "yellow" : ""}>
          <Link href="https://www.metafactory.ai/robots">$Robot</Link>
        </Box>
        <Flex px="2" bg={router.asPath === "/shop" ? "yellow" : ""}>
          <Box pr="1">
            <Image src="/arrow.svg" alt="" width="10px" height="10px" />
          </Box>
          <Link href="https://shop.metafactory.ai/">Shop</Link>
        </Flex>
      </Flex>
      <Spacer />
      <Flex>
        <Box px="2" bg={router.asPath === "/exchange" ? "yellow" : ""}>
          <Link href="/exchange">Exchange</Link>
        </Box>
        <Box px="2" bg={router.asPath === "/claim" ? "yellow" : ""}>
          <Link href="/claim">Claim</Link>
        </Box>
        <Box px="2" border="1px" bg={router.asPath === "/profile" ? "yellow" : ""}>
          <Link href="/profile">
            {!loading && !errors && !!account ? formatAddress(account) : "Connect"}
          </Link>
        </Box>
        <Box width={`${LOGO_HEIGHT}px`} />
      </Flex>
    </Flex>
  );
};

export default DesktopNavigation;
