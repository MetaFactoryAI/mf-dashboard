/* eslint-disable prettier/prettier */
import { Grid, GridItem } from "@chakra-ui/react";
import type { NextPage } from "next";

const ClaimWearables: NextPage = () => {
  const texts = ["test1", "test2", "test3", "test4", "test5", "test6"]

  return (
    <Grid templateColumns="repeat(10, 1fr)" width="100%" mt="25px">
      { texts.map((text) =>
      <GridItem
        mb="30px"
        key={text}
      >
        {text}
      </GridItem>
      )}
    </Grid>
    );
};

export default ClaimWearables;
