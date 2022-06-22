/* eslint-disable prettier/prettier */
import { VStack, Text, Center, Flex, Box } from "@chakra-ui/react";
import Button from "@/components/atoms/Button";
import type { NextPage } from "next";
import Image from "next/image";
import { useConnect } from "wagmi";
import { useEffect } from "react";
import Cookies from "js-cookie";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";

const Connect: NextPage = () => {
  const { connect, connectors } = useConnect();
  const { isDesktopScreen } = useChakraBreakpoints();

  useEffect(() => {
    Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "");
  }, []);

  return (
    <Flex flex="1" flexDirection="row" alignContent="center" justifyItems="center">
      <Center width="100%">
        <VStack px="88px" py="58px">
          <Box mb="8">
            <Image src="/w95_misc.png" alt="" width="108" height="82" />
          </Box>
          <Box maxWidth="266px" pb="40px">
            <Text fontFamily="heading" letterSpacing="-0.02em" lineHeight="35px" fontWeight="700" fontSize="29px" mx="15px" paddingBottom="0px" textAlign="center">
              MetaFactory Wearables OS
            </Text>
          </Box>
          <Box width="100%" maxWidth="330px" pb="40px">
            <Button
              handleClickCallback={() => {
                const connector = isDesktopScreen ? connectors[0] : connectors[1]
                connect(connector)
              }}
              height="40px"
              width="100%"
              backgroundColor="yellow"
              title="CONNECT WALLET"
            />
          </Box>
        </VStack>
      </Center>
  </Flex>
  );
};

export default Connect;
