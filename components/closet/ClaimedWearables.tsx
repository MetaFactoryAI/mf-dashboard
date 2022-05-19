/* eslint-disable prettier/prettier */
import { Grid, GridItem, VStack, Spacer, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import ListItem from "./shared/ListItem";

const ClaimedWearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6"] // , "7", "8", "11", "12", "13", "14"]

  return (
    <VStack spacing="0px" backgroundImage='url("/closet_bckg.png")' backgroundSize="cover">
      <Flex flex="1" flexDirection="row" width="100%" pl="10px" pr="10px">
        <Text fontFamily="body" fontSize="10px" textAlign="start">
          METADREAMER&apos;s closet
        </Text>
        <Spacer />

        <Text fontFamily="body" fontSize="10px" textAlign="end">
          WEARABLES COLLECTED {items.length}
        </Text>
      </Flex>
      <Grid templateColumns="repeat(12, 1fr)">
        { items.map((item) =>
        <GridItem
          mb="7px"
          key={item}
          colSpan={{ base: 6, sm: 6, md: 2, lg: 2 }}
        >
          <ListItem
            title1="COLLEGIATE ARC HOODIE"
            title2="METAFACTORY"
            assetUrl={`/test_assets/list_items/${item}.png`}
            redirectPath={`/closet_wearable_detail/${item}`}
          />
        </GridItem>
        )}
      </Grid>
    </VStack>
    );
};

export default ClaimedWearables;
