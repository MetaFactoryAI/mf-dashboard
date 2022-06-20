/* eslint-disable prettier/prettier */
import { Center, VStack, Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button"


const ClaimWearables: NextPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/closet')
  };

  return (
    <Center >
      <VStack spacing="0px" px="50px">
          <Box my="32px">
            <Image
              src="/success.png"
              alt=""
              width="80px"
              height="80px"
            />
          </Box>
          <Text color="##8B2CFF" fontFamily="accent" fontWeight="400" fontSize="24px" pt="5px" textAlign="center">
            Success!
          </Text>
          <Text color="##8B2CFF" fontFamily="caption" fontWeight="400" fontSize="14px" pb="20px" textAlign="center">
            Your claim request was successfully sent to the blockchain!
          </Text>
          <Button
            handleClickCallback={handleClick}
            height="40px"
            width="141px"
            backgroundColor="yellow"
            title="VIEW CLOSET"
          />
      </VStack>
    </Center>
  );
};

export default ClaimWearables;
