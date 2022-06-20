import React from "react";
import { Box, Text } from "@chakra-ui/react";

const SwapPoolPanelTab: React.FC<{
  title: string;
  handleClick: (key: number) => void;
  selectOption: number;
  currentSelection: number;
}> = ({ title, handleClick, selectOption, currentSelection }) => (
  <Box
    width="50%"
    onClick={() => handleClick(selectOption)}
    cursor="pointer"
    borderTop="2px"
    borderRight="0px"
    borderLeft="2px"
    borderColor="black"
    borderBottom={currentSelection === selectOption ? "0px" : "2px"}
    pb={currentSelection === selectOption ? "2px" : "0px"}
  >
    <Text
      fontFamily="body_bold"
      fontWeight="800px"
      fontSize="18px"
      color={currentSelection === selectOption ? "black" : "grey"}
      mx="16px"
      my="10px"
    >
      {title}
    </Text>
  </Box>
);

export default SwapPoolPanelTab;
