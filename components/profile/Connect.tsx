/* eslint-disable prettier/prettier */
import { VStack, Text, Box } from "@chakra-ui/react";
import Button from "@/components/atoms/Button";
import type { NextPage } from "next";
import Image from "next/image";
import { useConnect } from "wagmi";
import { useEffect } from "react";
import { AUTH_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";

const Connect: NextPage = () => {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    Cookies.remove(AUTH_TOKEN_KEY);
  }, []);

  return (
    <VStack p="4">
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
          handleClickCallback={() => connect(connectors[0])}
          height="40px"
          width="100%"
          backgroundColor="yellow"
          title="CONNECT WALLET"
        />
      </Box>
    </VStack>
  );
};

export default Connect;
