import React from "react";
import { Text, Center, VStack } from "@chakra-ui/react";
import useClaims from "@/hooks/useClaims";

const UnclaimedTokens: React.FC = () => {
  const { unclaimedTotal } = useClaims();

  return (
    <Center>
    <VStack border="2px" px="88px" py="58px">
      <Text>Unclaimed {unclaimedTotal} ROBOT</Text>
    </VStack>
  </Center>
  )
}

export default UnclaimedTokens;
