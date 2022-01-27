import React from "react";
import { Text, Flex, HStack } from "@chakra-ui/react";
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
        <HStack spacing="0px" onClick={handleRedirect} cursor="pointer">
          <Text
            pr="5px"
            textAlign="end"
            fontWeight="400px"
            fontSize="16px"
            fontFamily="body_regular"
          >
            {value}
          </Text>
          <Image src="/arrow.svg" alt="" width="12px" height="15px" />
        </HStack>
      )}
    </Flex>
  );
};

export default SummaryField2;
