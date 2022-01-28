import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  NumberInputField,
  Box,
} from "@chakra-ui/react";
import Token from "./Token";
import type { TokenBalance } from "@/hooks/usePoolGearData";

const SwapTokenField: React.FC<{
  selectedToken: TokenBalance;
  disableInput: boolean;
  tokenList: string[];
  setSelectedTokenCallback: (token: TokenBalance) => void;
}> = ({ selectedToken, disableInput, setSelectedTokenCallback, tokenList }) => (
  <HStack
    width="100%"
    spacing="0px"
    backgroundColor="white"
    border="2px"
    key={`pool-panel-token-balance-${selectedToken.symbol}`}
  >
    <Menu offset={[0, 0]}>
      <MenuButton width="50%">
        <HStack
          justifyContent="space-between"
          spacing="0px"
          backgroundColor="white"
          borderRight="2px"
        >
          <Token tokenSymbol={selectedToken.symbol} />
          <Box px="5px">
            <ChevronDownIcon />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList>
        {tokenList.map((tokenSymbol) => (
          <MenuItem
            key={`swap-token-field-menu-item-${tokenSymbol}`}
            onClick={() => setSelectedTokenCallback({ ...selectedToken, symbol: tokenSymbol })}
          >
            <Token tokenSymbol={tokenSymbol} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    <Box width="50%">
      <NumberInput
        isDisabled={disableInput}
        focusBorderColor="none"
        defaultValue={selectedToken.balance > 0 ? selectedToken.balance : undefined}
        onChange={(valueString) =>
          setSelectedTokenCallback({ ...selectedToken, balance: parseFloat(valueString) })
        }
      >
        <NumberInputField border="0px" textAlign="right" placeholder="1.0" />
      </NumberInput>
    </Box>
  </HStack>
);

export default SwapTokenField;
