import Image from "next/image";
import React from "react";
import { HStack, Box } from "@chakra-ui/react";

const Footer: React.FC = () => (
  <HStack bg="black" justify="end" color="white">
    <Box px="24px" fontSize="18px">
      <a href="https://www.metafactory.ai/">Help</a>
    </Box>
    <Box p="15px">
      <Image src="/footer-icon.svg" alt="" width="36" height="36" />
    </Box>
  </HStack>
);

export default Footer;
