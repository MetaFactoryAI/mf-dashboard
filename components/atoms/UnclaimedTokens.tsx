import React from "react";
import { Text, Center, VStack } from "@chakra-ui/react";
import useClaims from "@/hooks/useClaims";

const UnclaimedTokens: React.FC = () => {
  const { claimWeeks, latestClaimWeek } = useClaims();

  return (
    <Center>
    <VStack border="2px" px="88px" py="58px">
      <Text>Unclaimed</Text>
      {console.log(claimWeeks)}
    </VStack>
  </Center>
  )
}

export default UnclaimedTokens;
