import React from "react";
import { Text, VStack, Button, Flex } from "@chakra-ui/react";

const UnclaimedTokens: React.FC<{ unclaimedTotal: string; handleClaim: () => void }> = ({
  unclaimedTotal,
  handleClaim,
}) => (
  <VStack border="2px" spacing="0px" borderRight={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}>
    <Text alignSelf="start" fontFamily="body_bold" fontWeight="800" fontSize="24px" m="16px">
      Total pending ROBOT
    </Text>

    <Flex width="100%" backgroundColor="black">
      <Text alignSelf="start" fontWeight="400" fontSize="64px" color="white" m="16px">
        {unclaimedTotal}
      </Text>
    </Flex>
    <Flex width="100%" backgroundColor="#D9BAFF">
      <Button
        onClick={handleClaim}
        _focus={{ boxShadow: "none" }}
        variant="unstyled"
        alignSelf="center"
        width="100%"
        borderRadius="0px"
        mt="16px"
        mb="20px"
      >
        <Text color="##8B2CFF" fontFamily="body_bold" fontWeight="800" fontSize="24px">
          Claim
        </Text>
      </Button>
    </Flex>
  </VStack>
);

export default UnclaimedTokens;
