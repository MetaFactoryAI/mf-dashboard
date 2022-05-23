/* eslint-disable prettier/prettier */
import { VStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button"
import ListItems from "./shared/ListItems";

const ClaimWearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "11", "12", "13", "14"]
  const router = useRouter();
  const handleClick = () => {
    router.push('/closet_claim_success')
  };

  return (
    <VStack spacing="0px">
      <VStack mb="34px" mt="26px" lineHeight="16px">
        <Text fontFamily="accent" fontSize="17px" fontWeight="400">
          Welcome metadreamer.eth
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
      <ListItems items={items}/>
    </VStack>
    );
};

export default ClaimWearables;
