/* eslint-disable prettier/prettier */
import React, { useCallback } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { NftItem } from "@/hooks/useNftMetadata";
import ListItem from "./ListItem";

const ListItems: React.FC<{
  items: NftItem[];
}> = ({ items }) => {
  const calculateMobileBorder = useCallback((index: number) => index % 2 ? "0px" : "1px", []);

  return (
    <Grid templateColumns="repeat(12, 1fr)" width="100%" borderTop="1px">
      { items.map((item, index) =>
      <GridItem
        key={item.nft_token_id}
        colSpan={{ base: 6, sm: 6, md: 4, lg: 3 }}
        borderRight={{ base: calculateMobileBorder(index), sm: calculateMobileBorder(index), md: "1px", lg: "1px" }}
        borderBottom="1px"
      >
        <ListItem
          title1={item.nft_metadata.name}
          title2={item.nft_metadata.properties.brand}
          assetUrl={item.nft_metadata.image ? item.nft_metadata.image : `/test_assets/list_items/${(item.nft_token_id % 14) + 1}.png`}
          redirectPath={`/closet_wearable_detail/${item.nft_token_id}`}
        />
      </GridItem>
      )}
    </Grid>
  )}
export default ListItems;
