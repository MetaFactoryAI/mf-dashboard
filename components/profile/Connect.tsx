/* eslint-disable prettier/prettier */
import { VStack, Text, Box } from "@chakra-ui/react";
import Button from "@/components/atoms/Button";
import type { NextPage } from "next";
import { useWeb3Context } from "@/contexts/Web3Context";
import Image from "next/image";

const Connect: NextPage = () => {
  const { account, connectWeb3 } = useWeb3Context();
  const handleConnect = () => {
    if (!account) {
      connectWeb3();
    }
  };

  return (
    <VStack p="4">
      <Box mb="8">
        <Image src="/w95_misc.png" alt="" width="108" height="82" />
      </Box>
      <Box maxWidth="266px" pb="40px">
        <Text fontFamily="heading" fontWeight="700" fontSize="29px" mx="15px" paddingBottom="0px" textAlign="center">
          MetaFactory Wearables OS
        </Text>
      </Box>
      <Box width="100%" maxWidth="330px" pb="40px">
        <Button
          handleClickCallback={handleConnect}
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
