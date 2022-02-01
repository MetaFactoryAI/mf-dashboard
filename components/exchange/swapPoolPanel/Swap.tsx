/* eslint-disable camelcase */
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import React, { useState, useCallback } from "react";
import { Text, VStack, Button, Flex, Box, Center, useToast } from "@chakra-ui/react";
import Image from "next/image";
import qs from "qs";
import { IERC20__factory } from "types/ethers-contracts";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import SwapTokenField from "./shared/SwapTokenField";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Alert } from "@/components/atoms";

export interface SwapToken extends TokenBalance {
  address: string;
}

type Quote0xApi = {
  allowanceTarget: string;
  sellTokenAddress: string;
  sellAmount: string;
  to: string;
  data: string;
  value: string;
  gasPrice: string;
  gas: string;
};

const NON_METAFACTORY_TOKEN_SYMBOLS: SwapToken[] = [
  { symbol: "ETH", address: "ETH", balance: 0 },
  { symbol: "DAI", address: "0x6b175474e89094c44da98b954eedeac495271d0f", balance: 0 },
];
const METAFACTORY_TOKEN_SYMBOLS: SwapToken[] = [
  { symbol: "ROBOT", address: "0xfb5453340c03db5ade474b27e68b6a9c6b2823eb", balance: 0 },
];

const Swap: React.FC = () => {
  const toast = useToast();
  const [swapAlertMsg, setSwapAlertMsg] = React.useState<string>("");
  const [swapQuote, setSwapQuote] = React.useState<Quote0xApi>();
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const { loading, account, provider } = useWeb3Context();
  const [sellToken, setSellToken] = useState<SwapToken>({
    ...NON_METAFACTORY_TOKEN_SYMBOLS[0],
  });
  const [sellTokenList, setSellTokenList] = useState<SwapToken[]>(NON_METAFACTORY_TOKEN_SYMBOLS);

  const [buyToken, setBuyToken] = useState<SwapToken>({
    ...METAFACTORY_TOKEN_SYMBOLS[0],
  });
  const [buyTokenList, setBuyTokenList] = useState<SwapToken[]>(METAFACTORY_TOKEN_SYMBOLS);
  const switchTokens = () => {
    const currentSellToken = { ...sellToken };
    const currentSellTokenList = sellTokenList;

    setSellToken({ ...buyToken });
    setBuyToken({ ...currentSellToken });
    setSellTokenList(buyTokenList);
    setBuyTokenList(currentSellTokenList);
  };

  const handleSwap = useCallback(async () => {
    if (provider && account) {
      const normalizedSellBalance = () =>
        ethers.utils.parseEther(sellToken.balance.toString()).toString();
      const normalizedBuyBalance = () =>
        ethers.utils.parseEther(buyToken.balance.toString()).toString();
      const swapAmount =
        sellToken.balance > 0
          ? { sellAmount: normalizedSellBalance() }
          : { buyAmount: normalizedBuyBalance() };
      const params = {
        sellToken: sellToken.address,
        buyToken: buyToken.address,
        ...swapAmount,
      };
      const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);

      if (response.ok) {
        const quote = await response.json();
        const sellAmount = ethers.utils.formatEther(BigNumber.from(quote.sellAmount));
        const buyAmount = ethers.utils.formatEther(BigNumber.from(quote.buyAmount));
        const swapAlert = `Are you sure to sell ${sellAmount} ${sellToken.symbol} for ${buyAmount} ${buyToken.symbol}?`;

        setSwapAlertMsg(swapAlert);
        setSwapQuote(quote);
        setIsAlertOpen(true);
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
          isClosable: true,
        });
      }
    }
  }, [account, buyToken, provider, sellToken, toast]);

  const executeSwap = useCallback(async () => {
    if (provider && account && swapQuote) {
      const signer = provider.getSigner();

      // grant allowance for all but the ETH token
      if (swapQuote.allowanceTarget !== "0x0000000000000000000000000000000000000000") {
        const erc20Contract = IERC20__factory.connect(swapQuote.sellTokenAddress, signer);
        await erc20Contract.approve(
          swapQuote.allowanceTarget,
          BigNumber.from(swapQuote.sellAmount),
        );
      }

      const tx = {
        from: account,
        to: swapQuote.to,
        data: ethers.utils.hexlify(swapQuote.data),
        value: BigNumber.from(swapQuote.value),
        gasLimit: BigNumber.from(swapQuote.gas),
        gasPrice: BigNumber.from(swapQuote.gasPrice),
      };
      signer
        .sendTransaction(tx)
        .then((_result) => {
          toast({
            title: "SWAP processed and send to the blockchain",
            status: "success",
            isClosable: true,
          });
          setBuyToken({ ...buyToken, balance: 0 });
          setSellToken({ ...sellToken, balance: 0 });
        })
        .catch((error) => {
          toast({
            title: error.message,
            status: "error",
            isClosable: true,
          });
        });
    }
  }, [account, buyToken, provider, sellToken, swapQuote, toast]);

  if (loading || !account) return null;

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
          onClick={switchTokens}
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
          disabled={sellToken.balance === 0 && buyToken.balance === 0}
        >
          <Flex spacing="0px" justifyContent="center">
            <Text color="##8B2CFF" fontFamily="body_bold" fontWeight="800" fontSize="24px" m="5px">
              Preview trade
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Alert
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={swapAlertMsg}
        title="SWAP"
        confirmCallback={executeSwap}
      />
    </VStack>
  );
};

export default Swap;
