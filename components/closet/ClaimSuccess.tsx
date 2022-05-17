/* eslint-disable prettier/prettier */
import { Spacer, Center, VStack, Flex, Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";

const ClaimWearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "11", "12", "13", "14"]

  return (
    <Flex flex="1" flexDirection="row">
    <Spacer />
    <Center>
      <VStack spacing="0px">
          <Image
            src="/header-logo-mf.svg"
            alt=""
            width="100px"
            height="100px"
          />
          <Text color="##8B2CFF" fontFamily="body" fontWeight="400" fontSize="24px" pt="5px" textAlign="center">
            Success!
          </Text>
          <Text color="##8B2CFF" fontFamily="body" fontWeight="400" fontSize="14px" pb="20px" textAlign="center">
            You have successfully claimed your item(s)!
          </Text>
          <Text color="##8B2CFF" fontFamily="body" fontWeight="400" fontSize="14px" textAlign="center">
            Click here to view your closet
          </Text>
      </VStack>
    </Center>
    <Spacer />
    </Flex>
    );
};

export default ClaimWearables;
