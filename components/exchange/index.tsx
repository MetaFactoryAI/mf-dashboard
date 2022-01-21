import { Grid, GridItem, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import { GraphChart, Loading, PageTitle } from "@/components/atoms";
import { useWeb3Context } from "@/contexts/Web3Context";
import { usePoolGearData, HistoryRange } from "@/hooks/usePoolGearData";
import SwapPoolPanel from "./swapPoolPanel";

const Exchange: NextPage = () => {
  const { account } = useWeb3Context();
  const {
    fetchBalances,
    tokensBalances,
    loadingBalances,
    fetchPoolHistory,
    poolHistory,
    loadingPoolHistory,
  } = usePoolGearData();

  useEffect(() => {
    if (account) {
      fetchBalances(account);
      fetchPoolHistory(HistoryRange.Year);
    }
  }, [account, fetchBalances, fetchPoolHistory]);

  if (!tokensBalances || loadingBalances || loadingPoolHistory || !poolHistory) return <Loading />;

  return (
    <Box>
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="Exchange" />
      </Head>

      <PageTitle title="Exchange" />
      <Grid templateColumns="repeat(10, 1fr)" width="100%">
        <GridItem
          colSpan={{ base: 10, sm: 10 }}
          display={{ base: "block", sm: "block", md: "none", lg: "none" }}
          mb="30px"
        >
          <SwapPoolPanel tokensBalances={tokensBalances} />
        </GridItem>
        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
          <Box border="2px" spacing="0px">
            <GraphChart chartData={poolHistory} />
          </Box>
        </GridItem>
        <GridItem
          colSpan={{ md: 3, lg: 3 }}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          ml="30px"
        >
          <SwapPoolPanel tokensBalances={tokensBalances} />
        </GridItem>

        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }} borderBottom="2px" my="39px">
          TEXT
        </GridItem>
      </Grid>
      <Box />
    </Box>
  );
};

export default Exchange;
