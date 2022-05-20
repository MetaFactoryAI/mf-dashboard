/* eslint-disable prettier/prettier */
import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ListItem from "./ListItem";
import { Item } from './types';

const ListItems: React.FC<{
  items: Item[];
}> = ({ items }) => (
    <Grid templateColumns="repeat(12, 1fr)" width="100%" borderTop="1px">
      { items.map((item, index) =>
      <GridItem
        key={item}
        colSpan={{ base: 6, sm: 6, md: 2, lg: 2 }}
        borderLeft={index % 2 ? "1px" : "0px"}
        borderBottom="1px"
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
  )
export default ListItems;
