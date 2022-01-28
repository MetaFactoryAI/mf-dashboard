import React, { useState } from "react";
import {
  Text,
  VStack,
  Button,
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import SwapTokenField from "./shared/SwapTokenField";

const Swap: React.FC = () => {
  const NON_METAFACTORY_TOKEN_SYMBOLS: string[] = ["WETH", "DAI"];
  const METAFACTORY_TOKEN_SYMBOLS: string[] = ["ROBOT"];
  const [sellToken, setSellToken] = useState<TokenBalance>({
    symbol: NON_METAFACTORY_TOKEN_SYMBOLS[0],
    balance: 0,
  });
  const [sellTokenList, setSellTokenList] = useState<string[]>(NON_METAFACTORY_TOKEN_SYMBOLS);

  const [buyToken, setBuyToken] = useState<TokenBalance>({
    symbol: METAFACTORY_TOKEN_SYMBOLS[0],
    balance: 0,
  });
  const [buyTokenList, setBuyTokenList] = useState<string[]>(METAFACTORY_TOKEN_SYMBOLS);
  const switchCurrencies = () => {
    const currentSellToken = { ...sellToken };
    const currentSellTokenList = sellTokenList;

    setSellToken({ ...buyToken });
    setBuyToken({ ...currentSellToken });
    setSellTokenList(buyTokenList);
    setBuyTokenList(currentSellTokenList);
  };

  const handleSwap = () => {
    // TODO HANDLE SWAP
  };

  return (
    <VStack border="2px" borderTop="0px" borderRight="0px" spacing="0px">
      <VStack spacing="16px" width="100%" px="32px" pt="32px" pb="26px">
        <Box width="100%">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            Sell
          </Text>
        </Box>
        <SwapTokenField
          selectedToken={sellToken}
          disableInput={!!buyToken.balance && buyToken.balance > 0}
          tokenList={sellTokenList}
          setSelectedTokenCallback={setSellToken}
        />
        <Center
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          borderRadius="10px"
          cursor="pointer"
          onClick={switchCurrencies}
        >
          <Image src="/switch.svg" alt="" width="40px" height="40px" />
        </Center>
        <Box width="100%">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            Buy
          </Text>
        </Box>
        <SwapTokenField
          selectedToken={buyToken}
          disableInput={!!sellToken.balance && sellToken.balance > 0}
          tokenList={buyTokenList}
          setSelectedTokenCallback={setBuyToken}
        />
      </VStack>
      <Flex width="100%" backgroundColor="#D9BAFF">
        <Button
          onClick={handleSwap}
          _focus={{ boxShadow: "none" }}
          variant="unstyled"
          alignSelf="center"
          width="100%"
          borderRadius="0px"
          mt="16px"
          mb="20px"
        >
          <Flex spacing="0px" justifyContent="center">
            <Text color="##8B2CFF" fontFamily="body_bold" fontWeight="800" fontSize="24px" m="5px">
              Preview trade
            </Text>
          </Flex>
        </Button>
      </Flex>
    </VStack>
  );
};

export default Swap;
