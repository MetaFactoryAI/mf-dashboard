import React from "react";
import { Text, HStack } from "@chakra-ui/react";
import Image from "next/image";

const Token: React.FC<{
  tokenSymbol: string;
}> = ({ tokenSymbol }) => (
  <HStack spacing="0px">
    <Image src={`/token-${tokenSymbol.toLowerCase()}.svg`} alt="" width="52px" height="52px" />
    <Text fontFamily="body_regular" px="16px" fontWeight="400" fontSize="16px">
      {tokenSymbol}
    </Text>
  </HStack>
);

export default Token;
