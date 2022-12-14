import Image from "next/image";
import React, { useEffect } from "react";
import { VStack, Text, Box, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";

const Profile: NextPage = () => {
  const selectEthToastId = "select_eth_toast_id";
  const toast = useToast();

  useEffect(() => {
    if (!toast.isActive(selectEthToastId)) {
      toast({
        id: selectEthToastId,
        title: `Please select ${
          process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? "GOERLI" : "Ethereum mainnet"
        } network`,
        status: "error",
        isClosable: true,
      });
    }
  }, [toast]);

  return (
    <VStack p="4">
      <Box mb="8">
        <Image src="/w95_misc.png" alt="" width="108" height="82" />
      </Box>
      <Box maxWidth="266px" pb="40px">
        <Text
          fontFamily="heading"
          letterSpacing="-0.02em"
          lineHeight="35px"
          fontWeight="700"
          fontSize="29px"
          mx="15px"
          paddingBottom="0px"
          textAlign="center"
        >
          MetaFactory Wearables OS
        </Text>
      </Box>
    </VStack>
  );
};

export default Profile;
