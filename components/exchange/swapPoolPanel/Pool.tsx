import React from "react";
import { Text, VStack, Button, Flex, Box, HStack } from "@chakra-ui/react";
import Image from "next/image";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import { formatNumber } from "@/utils/presentationHelper";
import Token from "./shared/Token";

const Pool: React.FC<{ tokensBalances: TokenBalance[] }> = ({ tokensBalances }) => {
  const handleLiquidityRedirect = () => {
    window.location.assign(
      `https://app.balancer.fi/#/pool/${process.env.NEXT_PUBLIC_BALANCER_POOL_ID}`,
    );
  };

  return (
    <VStack border="2px" borderTop="0px" borderRight="0px" spacing="0px">
      <VStack spacing="16px" width="100%" px="32px" pt="32px" pb="26px">
        <Box width="100%">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            Your Balance
          </Text>
        </Box>
        {tokensBalances.map((token) => (
          <HStack
            width="100%"
            spacing="0px"
            backgroundColor="black"
            border="2px"
            key={`pool-panel-token-balance-${token.symbol}`}
          >
            <HStack width="50%" spacing="0px" backgroundColor="background">
              <Token tokenSymbol={token.symbol} />
            </HStack>
            <Box width="50%" backgroundColor="black">
              <Text
                fontFamily="body"
                letterSpacing="-0.02em"
                textAlign="end"
                fontWeight="400"
                fontSize="18px"
                mx="16px"
                color="white"
              >
                {formatNumber(token.balance)}
              </Text>
            </Box>
          </HStack>
        ))}
        <Box width="100%" p="16px">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="12px">
            Speaking of $ROBOT, transfers are now enabled and liquidity pools are live! $GEAR
            yourself up while playing.
          </Text>
        </Box>
      </VStack>
      <Flex width="100%" backgroundColor="#D9BAFF">
        <Button
          onClick={handleLiquidityRedirect}
          _focus={{ boxShadow: "none" }}
          variant="unstyled"
          alignSelf="center"
          width="100%"
          borderRadius="0px"
          mt="16px"
          mb="20px"
        >
          <Flex justifyContent="center">
            <Text color="##8B2CFF" fontFamily="body_bold" fontWeight="800" fontSize="24px" m="5px">
              Invest
            </Text>
            <Image src="/arrow.svg" alt="" width="15px" height="15px" />
          </Flex>
        </Button>
      </Flex>
    </VStack>
  );
};

export default Pool;
