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
          <a href="https://www.metafactory.ai/" target="_blank" rel="noopener noreferrer">
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
              <Box px="2" border="1px" bg={router.asPath.indexOf("/profile") >= 0 ? "yellow" : ""}>
                <Link href="/profile">
                  {!loading && !errors && !!account ? formatAddress(account) : "Connect"}
                </Link>
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
            redirectPath="https://www.metafactory.ai"
            handleRedirect={handleRedirect}
            label="Home"
          />
          {/* <MobileItem
            currentPath={router.asPath}
            redirectPath="https://www.metafactory.ai/robots"
            handleRedirect={handleRedirect}
            label="$Robot"
          /> */}
          <Flex px="2" bg={router.asPath === "/shop" ? "yellow" : ""} width="100%">
            <Center pr="1">
              <Image src="/arrow.svg" alt="" width="10px" height="10px" />
            </Center>
            <Button
              _focus={{ boxShadow: "none" }}
              onClick={() => handleRedirect("https://shop.metafactory.ai/")}
              variant="unstyled"
              fontWeight="400"
            >
              Shop
            </Button>
          </Flex>
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/exchange"
            handleRedirect={handleRedirect}
            label="Exchange"
          />
          {/* <MobileItem
            currentPath={router.asPath}
            redirectPath="/claim"
            handleRedirect={handleRedirect}
            label="Claim"
          /> */}
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/profile"
            handleRedirect={handleRedirect}
            label={!loading && !errors && !!account ? formatAddress(account) : "Connect"}
            border="1px"
            borderRadius="0px"
          />
        </VStack>
      )}
    </Box>
  );
};

export default MobileNavigation;
