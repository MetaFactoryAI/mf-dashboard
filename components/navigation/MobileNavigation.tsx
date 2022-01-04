import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Flex,
  Spacer,
  Box,
  IconButton,
  useDisclosure,
  VStack,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useWeb3Context } from "@/contexts/Web3Context";
import { formatAddress } from "@/utils/presentationHelper";
import MobileItem from "./MobileItem";

const MobileNavigation: React.FC = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, loading, errors } = useWeb3Context();
  const MOBILE_LOGO_HEIGHT = 40;
  const handleRedirect = (url: string) => {
    onClose();
    router.push(url);
  };

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
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/project"
            handleRedirect={handleRedirect}
            label="Project"
          />
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/robot"
            handleRedirect={handleRedirect}
            label="$Robot"
          />
          <Flex px="2" bg={router.asPath === "/shop" ? "yellow" : ""} width="100%">
            <Center pr="1">
              <Image src="/arrow.svg" alt="" width="10px" height="10px" />
            </Center>
            <Button
              _focus={{ boxShadow: "none" }}
              onClick={() => handleRedirect("/shop")}
              variant="unstyled"
              fontWeight="400"
            >
              Shop
            </Button>
          </Flex>
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/curate"
            handleRedirect={handleRedirect}
            label="Curate"
          />
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/exchange"
            handleRedirect={handleRedirect}
            label="Exchange"
          />
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/claim"
            handleRedirect={handleRedirect}
            label="Claim"
          />
          <Box px="2" bg={router.asPath.indexOf("/connect") >= 0 ? "yellow" : ""} width="100%">
            {!loading && !errors && !!account && (
              <Flex justifyItems="start" alignItems="start">
                <Button
                  _focus={{ boxShadow: "none" }}
                  onClick={() => handleRedirect("/connected")}
                  variant="unstyled"
                  fontWeight="400"
                  border="1px"
                  borderRadius="0px"
                >
                  <Text mx="10px">{formatAddress(account)}</Text>
                </Button>
              </Flex>
            )}
            {!loading && !account && (
              <Button
                _focus={{ boxShadow: "none" }}
                onClick={() => handleRedirect("/connect")}
                variant="unstyled"
                fontWeight="400"
                border="1px"
                borderRadius="0px"
              >
                <Text mx="10px">Connect</Text>
              </Button>
            )}
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default MobileNavigation;