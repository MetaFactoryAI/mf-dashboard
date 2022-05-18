/* eslint-disable prettier/prettier */
import { Grid, GridItem, VStack, Flex, Button, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import ListItem from "./shared/ListItem";

const ClaimWearables: NextPage = () => {
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "11", "12", "13", "14"]
  const router = useRouter();
  const handleClick = () => {
    router.push('/closet_claim_success')
  };

  return (
    <VStack spacing="0px">
      <VStack mb="34px" mt="26px">
        <Text fontFamily="body" fontSize="15px">
          you have colelcted <b>{items.length}</b> wearables
        </Text>
        <Flex width="110px" height="40px" backgroundColor="#00ECFF" border="1px">
          <Button
            onClick={handleClick}
            _focus={{ boxShadow: "none" }}
            variant="unstyled"
            alignSelf="center"
            width="100%"
            borderRadius="0px"
            mt="16px"
            mb="15px"
          >
            <Text color="##8B2CFF" fontFamily="body_bold" fontWeight="800" fontSize="17px">
              Claim
            </Text>
          </Button>
        </Flex>
      </VStack>
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

export default ClaimWearables;
