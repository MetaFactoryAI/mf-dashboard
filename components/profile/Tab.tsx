import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";

const MobileItem: React.FC<{
  title: string;
  selectColor: string;
  avatar: string;
  selectOption: number;
  currentSelection: number;
  handleClick: (key: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}> = ({ title, selectColor, avatar, selectOption, currentSelection, handleClick, ...props }) => (
  <Box
    backgroundColor={selectOption === currentSelection ? selectColor : "white"}
    borderX="2px"
    borderTop="2px"
    mr="5px"
  >
    <HStack
      onClick={() => handleClick(selectOption)}
      cursor="pointer"
      {...props}
      spacing="0px"
      p="15px"
    >
      <Image src={avatar} alt="" width="40px" height="40px" />
      <Text fontWeight="400" fontSize="18px" pl="8px">
        {title}
      </Text>
    </HStack>
  </Box>
);

export default MobileItem;
