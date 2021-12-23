import React from "react";
import { Box } from "@chakra-ui/react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const Navigation: React.FC = () => (
  <>
    <Box display={{ base: "block", sm: "block", md: "none", lg: "none" }} mx="24px" my="16px">
      <MobileNavigation />
    </Box>
    <Box display={{ base: "none", sm: "none", md: "block", lg: "block" }}>
      <DesktopNavigation />
    </Box>
  </>
);

export default Navigation;
