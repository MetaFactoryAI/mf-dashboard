/* eslint-disable prettier/prettier */
import { VStack, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import ListItems from "./shared/ListItems";

const Wearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "11", "12", "13", "14"]

  return (
    <VStack spacing="0px">
      <HStack spacing="0px" alignSelf="start"  mb="15px">
        <Text fontFamily="body_bold" fontSize="14px" mx="15px">
          CLOSET
        </Text>
        <Text fontFamily="body" fontSize="10px" textAlign="end">
          {items.length} ITEMS
        </Text>
      </HStack>
      <ListItems items={items}/>
    </VStack>
    );
};

export default Wearables;
