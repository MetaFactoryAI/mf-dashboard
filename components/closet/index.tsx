/* eslint-disable prettier/prettier */
import { useState } from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import ListItems from "./ListItems";
import ClaimWearables from "./ClaimWearables";


const Wearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "11", "12", "13", "14"]
  const [isClaimable, _setIsClaimable] = useState<boolean>(true);

  return (
    <VStack spacing="0px">
      {isClaimable && <ClaimWearables />}
      {!isClaimable && (
        <HStack spacing="0px" alignSelf="start"  mb="15px" alignItems="baseline" >
          <Text fontFamily="heading" letterSpacing="-0.02em" lineHeight="35px" fontWeight="700" fontSize="29px" mx="15px" paddingBottom="0px">
            Closet
          </Text>
          <Text fontFamily="caption" fontSize="14px" fontWeight="400" textAlign="end">
            {items.length} ITEMS
          </Text>
        </HStack>
      )}
      <ListItems items={items}/>
    </VStack>
    );
};

export default Wearables;
