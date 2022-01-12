// eslint-disable-next-line camelcase
import { Box, Grid, GridItem, Text, Flex, HStack, Center } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import useClaims from "@/hooks/useClaims";
import useFetchGraph from "@/utils/graph/useFetchGraph";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Loading, PieChart } from "@/components/atoms";
import UnclaimedTokens from "../atoms/UnclaimedTokens";

const Connected: NextPage = () => {
  const { designerRewards, buyerRewards, loading, fetchDesignerRewards, fetchBuyerRewards } =
    useFetchGraph();
  const { loading: loadingWeb3, accountAuthBearer, account } = useWeb3Context();
  const { unclaimedTotal, claimedTotal, handleClaim } = useClaims();

  const pieChartData = [
    {
      key: `Buyer${String.fromCharCode(160)}Rewards`,
      // @ts-ignore
      value: buyerRewards.total,
      color: "#00ECFF",
      avatarSrc: "/avatar-default.svg",
    },
    {
      key: `Designer${String.fromCharCode(160)}Rewards`,
      // @ts-ignore
      value: designerRewards.total,
      color: "#FF2ECE",
      avatarSrc: "/avatar-designer.svg",
    },
  ];

  useEffect(() => {
    if (accountAuthBearer && account) {
      fetchDesignerRewards(account, accountAuthBearer);
      fetchBuyerRewards(account, accountAuthBearer);
    }
  }, [fetchDesignerRewards, accountAuthBearer, account, fetchBuyerRewards]);

  return (
    <Box>
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="MetaFactory Dashboard" />
      </Head>
      {(loading || loadingWeb3) && <Loading />}
      {!loading && !loadingWeb3 && (
        <Grid templateColumns="repeat(10, 1fr)" width="100%">
          <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
            <HStack border="2px" alignItems="start" spacing="0px">
              <Box>
                <Box backgroundColor="black" color="white">
                  <Text
                    pt="24px"
                    pl="24px"
                    pb="22px"
                    pr="146px"
                    fontSize="32px"
                    fontFamily="body_bold"
                    fontWeight="800"
                  >
                    Earning
                  </Text>
                </Box>
                <Box>
                  <Text
                    pt="16px"
                    pl="24px"
                    pr="146px"
                    fontSize="14px"
                    fontFamily="body_regular"
                    fontWeight="800"
                  >
                    Total Claimed
                  </Text>
                  <Text
                    pt="6px"
                    pl="24px"
                    pr="146px"
                    fontSize="24px"
                    fontFamily="body_bold"
                    fontWeight="800"
                  >
                    {claimedTotal} ROBOT
                  </Text>
                </Box>
              </Box>
              <Flex flex="1" justifyContent="center" borderLeft="2px">
                <Center width="100%">
                  <Box width="100%" maxWidth="400px">
                    <PieChart chartData={pieChartData} />
                  </Box>
                </Center>
              </Flex>
            </HStack>
          </GridItem>
          <GridItem
            colSpan={{ md: 3, lg: 3 }}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            ml="30px"
          >
            <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
          </GridItem>

          <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
            <Flex
              justifyContent={{ base: "start ", sm: "start", md: "start", lg: "start" }}
              borderBottom="2px"
              my="39px"
            >
              <Box backgroundColor="black" color="white">
                <Text px="10px" py="2px" fontWeight="400" fontSize="18px">
                  History
                </Text>
              </Box>
            </Flex>
            {/* <Table
                // @ts-ignore
                columns={tableColumns}
                data={claims || []}
                initialState={{
                  pageSize: 10,
                }}
              /> */}
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};

export default Connected;
