import React from "react";
import { Button as ChakraButton, Text } from "@chakra-ui/react";

const Button: React.FC<{
  handleClickCallback: () => void;
  height: string;
  width: string;
  title: string;
  backgroundColor?: string | null;
}> = ({ title, handleClickCallback, height, width, backgroundColor }) => (
  <ChakraButton
    onClick={handleClickCallback}
    variant="unstyled"
    transition="all 0s"
    boxShadow="inset 2px 2px 0px rgba(255, 255, 255, 0.4), inset -2px -2px 0px rgba(0, 0, 0, 0.6)"
    _focus={{
      boxShadow:
        "inset 2px 2px 0px rgba(255, 255, 255, 0.4), inset -2px -2px 0px rgba(0, 0, 0, 0.6)",
    }}
    _active={{
      boxShadow: "none",
      WebkitTapHighlightColor: "transparent",
    }}
    border="2px solid #000000"
    py="5px"
    px="11px"
    height={height}
    width={width}
    background="background"
    borderRadius="0px"
    backgroundColor={backgroundColor || ""}
  >
    <Text fontFamily="accent" fontWeight="400" fontSize="14px">
      {title}
    </Text>
  </ChakraButton>
);

Button.defaultProps = {
  backgroundColor: null,
};

export default Button;
