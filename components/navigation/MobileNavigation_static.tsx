TO BE REMOVED !
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex, Text, Spacer, Box, IconButton, useDisclosure, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useWeb3Context } from "@/contexts/Web3Context";
import { formatAddress } from "@/utils/presentationHelper";

const MobileNavigation: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, loading, errors } = useWeb3Context();
  const MOBILE_LOGO_HEIGHT = 40;

  return (
    <Box>
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" fontSize="18px">
        <Box>
          <a href="https://www.metafactory.ai/">
            <Image
              src="/header-logo-mf.svg"
              alt=""
              width={`${MOBILE_LOGO_HEIGHT}px`}
              height={`${MOBILE_LOGO_HEIGHT}px`}
            />
          </a>
        </Box>
        <Spacer />
        <Flex>
          {!isOpen && (
            <>
              <Box px="2" border="1px" bg={router.asPath.indexOf("/connect") >= 0 ? "yellow" : ""}>
                {!loading && !errors && !!account && (
                  <Link href="/connected">{formatAddress(account)}</Link>
                )}
                {!loading && !account && <Link href="/connect">Connect</Link>}
              </Box>
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Sidebar Menu"
                onClick={onOpen}
                bg="none"
                _focus={{
                  borderColor: "unset",
                }}
                height={`${MOBILE_LOGO_HEIGHT - 5}px`}
              />
            </>
          )}
          {isOpen && (
            <IconButton
              icon={<CloseIcon />}
              aria-label="Close Sidebar Menu"
              onClick={onClose}
              bg="none"
              _focus={{
                borderColor: "unset",
              }}
              height={`${MOBILE_LOGO_HEIGHT - 5}px`}
            />
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <VStack alignItems="start" width="100%" mt="90px">
          <Box px="2" bg={router.asPath === "/project" ? "yellow" : ""} width="100%">
            <Link href="/project" passHref>
              <Text onClick={onClose}>Project</Text>
            </Link>
          </Box>
          <Box px="2" bg={router.asPath === "/robot" ? "yellow" : ""} width="100%">
            <Link href="/robot" passHref>
              <Text onClick={onClose}>$Robot</Text>
            </Link>
          </Box>
          <Flex px="2" bg={router.asPath === "/shop" ? "yellow" : ""} width="100%">
            <Box pr="1">
              <Image src="/arrow.svg" alt="" width="10px" height="10px" />
            </Box>
            <Link href="/shop" passHref>
              <Text onClick={onClose}>Shop</Text>
            </Link>
          </Flex>
          <Box px="2" bg={router.asPath === "/curate" ? "yellow" : ""} width="100%">
            <Link href="/curate" passHref>
              <Text onClick={onClose}>Curate</Text>
            </Link>
          </Box>
          <Box px="2" bg={router.asPath === "/exchange" ? "yellow" : ""} width="100%">
            <Link href="/exchange" passHref>
              <Text onClick={onClose}>Exchange</Text>
            </Link>
          </Box>
          <Box px="2" bg={router.asPath === "/claim" ? "yellow" : ""} width="100%">
            <Link href="/claim" passHref>
              <Text onClick={onClose}>Claim</Text>
            </Link>
          </Box>
          <Box px="2" bg={router.asPath.indexOf("/connect") >= 0 ? "yellow" : ""} width="100%">
            {!loading && !errors && !!account && (
              <Flex justifyItems="start" alignItems="start">
                <Link href="/connected" passHref>
                  <Text border="1px" onClick={onClose}>
                    {formatAddress(account)}
                  </Text>
                </Link>
              </Flex>
            )}
            {!loading && !account && <Link href="/connect">Connect</Link>}
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default MobileNavigation;
