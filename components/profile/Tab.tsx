import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";

const MobileItem: React.FC<{
  title: string;
  selectColor: string;
  avatar: string;
  selectOption: string;
  currentSelection: string;
  handleClick: (key: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}> = ({ title, selectColor, avatar, selectOption, currentSelection, handleClick, ...props }) => {
  const { isDesktopScreen } = useChakraBreakpoints();

  return (
    <Box
      backgroundColor={selectOption === currentSelection ? selectColor : "white"}
      borderRight="2px"
      borderTop="2px"
    >
      <HStack
        onClick={() => handleClick(selectOption)}
        cursor="pointer"
        {...props}
        spacing="0px"
        p="15px"
      >
        <Image src={avatar} alt="" width="40px" height="40px" />
        {((!isDesktopScreen && selectOption === currentSelection) || isDesktopScreen) && (
          <Text fontWeight="400" fontSize="18px" pl="8px">
            {title}
          </Text>
        )}
      </HStack>
    </Box>
  );
};

export default MobileItem;
