import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { isSelected } from "@/utils/navigation";

const MobileItem: React.FC<{
  currentPath: string;
  redirectPath: string;
  handleRedirect: (path: string) => void;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}> = ({ currentPath, redirectPath, handleRedirect, label, ...props }) => (
  <Box px="2" bg={isSelected(redirectPath, currentPath) ? "yellow" : ""} width="100%">
    <Button
      _focus={{ boxShadow: "none" }}
      onClick={() => handleRedirect(redirectPath)}
      variant="unstyled"
      fontWeight="400"
      {...props}
    >
      <Text mx="10px">{label}</Text>
    </Button>
  </Box>
);

export default MobileItem;
