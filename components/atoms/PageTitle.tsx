import React from "react";
import { Text, Box } from "@chakra-ui/react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => (
  <Box>
    <Text fontFamily="body_bold" fontWeight="800" fontSize="24px" pl="22px" pt="32px" pb="24px">
      {title}
    </Text>
  </Box>
);

export default PageTitle;
