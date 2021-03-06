import React from "react";
import { Box, Text } from "@chakra-ui/react";

const SummaryField: React.FC<{
  title: string;
  value: string;
}> = ({ title, value }) => (
  <Box
    py="16px"
    px="24px"
    border="2px"
    borderLeft={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}
    borderTop="0px"
  >
    <Text fontWeight="400px" fontSize="14px">
      {title}
    </Text>
    <Text fontFamily="body_bold" fontWeight="800px" fontSize="24px">
      {value}
    </Text>
  </Box>
);

export default SummaryField;
