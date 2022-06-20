import CustomButton from "@/components/atoms/Button";
import Image from "next/image";
import React from "react";
import {
  Flex,
  HStack,
  Box,
  IconButton,
  useDisclosure,
  VStack,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useUserName from "@/hooks/useUserName";
import MobileItem from "./MobileItem";

const MobileNavigation: React.FC = () => {
  const userName = useUserName();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const MOBILE_LOGO_HEIGHT = 23;
  const MOBILE_LOGO_WIDTH = 139;
  const handleRedirect = (url: string) => {
    onClose();
    router.push(url);
  };
  const handleLogoRedirect = () => {
    onClose();
    router.push("https://www.metafactory.ai/");
  };

  return (
    <Box borderBottom="2px">
      <HStack justify="space-between" fontSize="18px">
        <Box pb="10px" pt="25px" pl="25px">
          <Image
            src="/header-logo-mf.svg"
            alt=""
            width={`${MOBILE_LOGO_WIDTH}px`}
            height={`${MOBILE_LOGO_HEIGHT}px`}
            onClick={handleLogoRedirect}
          />
        </Box>
        <Flex>
          {!isOpen && (
            <>
              <CustomButton
                handleClickCallback={() => handleRedirect("/profile")}
                height="100%"
                width="80px"
                backgroundColor="yellow"
                title={userName || "Connect"}
              />
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Sidebar Menu"
                onClick={onOpen}
                bg="none"
                _focus={{
                  borderColor: "unset",
                }}
                height={`${MOBILE_LOGO_HEIGHT - 5}px`}
                pt="10px"
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
      </HStack>

      {isOpen && (
        <VStack alignItems="start" width="100%" mb="20px">
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
            redirectPath="/"
            handleRedirect={handleRedirect}
            label="Closet"
          />
          <MobileItem
            currentPath={router.asPath}
            redirectPath="/profile"
            handleRedirect={handleRedirect}
            label={userName || "Connect"}
            border="1px"
            borderRadius="0px"
          />
        </VStack>
      )}
    </Box>
  );
};

export default MobileNavigation;
