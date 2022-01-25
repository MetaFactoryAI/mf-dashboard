import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import Image from "next/image";

const SummaryField2: React.FC<{
  title: string;
  value: string;
  // eslint-disable-next-line react/require-default-props
  redirectLink?: string | null;
}> = ({ title, value, redirectLink }) => {
  const handleRedirect = () => {
    if (redirectLink) window.location.assign(redirectLink);
  };

  return (
    <Flex p="16px" width="100%" justifyContent="space-between">
      <Text fontWeight="400px" fontSize="16px" fontFamily="body_regular">
        {title}
      </Text>
      {!redirectLink && (
        <Text textAlign="end" fontWeight="400px" fontSize="16px" fontFamily="body_regular">
          {value}
        </Text>
      )}
      {redirectLink && (
        <Box onClick={handleRedirect} cursor="pointer">
          <Text textAlign="end" fontWeight="400px" fontSize="16px" fontFamily="body_regular">
            {value}&nbsp;
            <Image src="/arrow.svg" alt="" width="15px" height="15px" />
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default SummaryField2;
