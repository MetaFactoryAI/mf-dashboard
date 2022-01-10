import React from "react";
import { Text, Center, VStack, Button } from "@chakra-ui/react";

const UnclaimedTokens: React.FC<{ unclaimedTotal: number; handleClaim: () => void }> = ({
  unclaimedTotal,
  handleClaim,
}) => (
  <Center>
    <VStack border="2px" px="88px" py="58px">
      <Text>Unclaimed {unclaimedTotal} ROBOT</Text>
      <Button
        onClick={handleClaim}
        backgroundColor="transparent"
        border="1px"
        rounded="false"
        _hover={{ bg: "transparent" }}
      >
        Claim balance
      </Button>
    </VStack>
  </Center>
);

export default UnclaimedTokens;
