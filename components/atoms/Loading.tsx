import React from "react";
import Image from "next/image";
import { Text, Center, VStack, Flex, Spacer } from "@chakra-ui/react";

const Loading: React.FC = () => (
  <Flex flex="1" flexDirection="row">
    <Spacer />
    <Center>
      <VStack border="2px" px="88px" py="58px">
        <Image src="/mf-loader.gif" alt="" width="160px" height="160px" />
        <Text>Loading...</Text>
      </VStack>
    </Center>
    <Spacer />
  </Flex>
);

export default Loading;
