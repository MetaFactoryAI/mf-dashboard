/* eslint-disable prettier/prettier */
import { Grid, GridItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import ListItem from "./shared/ListItem";

const ClaimWearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6"]

  return (
    <Grid templateColumns="repeat(8, 1fr)">
      { items.map((item) =>
      <GridItem
        mb="7px"
        key={item}
        colSpan={{ base: 4, sm: 4, md: 2, lg: 2 }}
      >
        <ListItem
          title1="COLLEGIATE ARC HOODIE"
          title2="METAFACTORY"
          assetUrl={`/test_assets/list_items/${item}.png`}
          redirectPath={`/closet/item_detail/${item}`}
        />
      </GridItem>
      )}
    </Grid>
    );
};

export default ClaimWearables;
