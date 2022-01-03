import React from "react";
import { Box, Button } from "@chakra-ui/react";

const MobileItem: React.FC<{
  currentPath: string;
  redirectPath: string;
  handleRedirect: (path: string) => void;
  label: string;
}> = ({ currentPath, redirectPath, handleRedirect, label }) => (
  <Box px="2" bg={currentPath === redirectPath ? "yellow" : ""} width="100%">
    <Button
      _focus={{ boxShadow: "none" }}
      onClick={() => handleRedirect(redirectPath)}
      variant="unstyled"
      fontWeight="400"
    >
      {label}
    </Button>
  </Box>
);

export default MobileItem;
