import React, { ReactNode } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

const Button: React.FC<{
  children: ReactNode;
  handleClickCallback: () => void;
  height: string;
  width: string;
}> = ({ children, handleClickCallback, height, width, ...props }) => (
  <ChakraButton
    onClick={handleClickCallback}
    _focus={{ boxShadow: "none" }}
    variant="unstyled"
    boxShadow="inset 2px 2px 0px rgba(255, 255, 255, 0.4), inset -2px -2px 0px rgba(0, 0, 0, 0.6)"
    border="2px solid #000000"
    py="5px"
    px="11px"
    height={height}
    width={width}
    background="#8E8F8A"
    borderRadius="0px"
    {...props}
  >
    {children}
  </ChakraButton>
);

export default Button;
