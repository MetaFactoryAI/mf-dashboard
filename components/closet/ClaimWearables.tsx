/* eslint-disable prettier/prettier */
import { VStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button"
import useUserName from "@/hooks/useUserName";

const ClaimWearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "11", "12", "13", "14"]
  const router = useRouter();
  const handleClick = () => {
    router.push('/closet_claim_success')
  };
  const userName = useUserName()

  return (
    <VStack spacing="0px">
      <VStack mb="34px" mt="26px" lineHeight="16px">
        <Text fontFamily="accent" fontSize="17px" fontWeight="400">
          Welcome {userName}
        </Text>
        <Text fontFamily="caption" fontSize="12px" fontWeight="400" pb="10px">
          You have {items.length} items available to claim
        </Text>
        <Button
          handleClickCallback={handleClick}
          height="40px"
          width="141px"
          backgroundColor="yellow"
          title="CLAIM"
        />
      </VStack>
    </VStack>
    );
};

export default ClaimWearables;
