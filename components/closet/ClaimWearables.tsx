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
      <VStack mb="34px" mt="26px">
        <Text fontFamily="body_bold" fontSize="15px">
          Welcome metadreamer.eth
        </Text>
        <Text fontFamily="body" fontSize="15px">
          You have {items.length} items available to claim
        </Text>
        <Button
          handleClickCallback={handleClick}
          height="43px"
          width="105px"
        >
          <Text fontFamily="body_regular" fontWeight="400" fontSize="12px">
            CLAIM
          </Text>
        </Button>
      </VStack>
      <ListItems items={items}/>
    </VStack>
    );
};

export default ClaimWearables;
