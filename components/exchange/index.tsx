import { Grid, GridItem, Box, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import { GraphChart, Loading, PageTitle } from "@/components/atoms";
import { useWeb3Context } from "@/contexts/Web3Context";
import usePoolGearData from "@/hooks/usePoolGearData";
import SwapPoolPanel from "./swapPoolPanel";

const Exchange: NextPage = () => {
  const { account } = useWeb3Context();
  const { fetchBalances, tokensBalances, loading } = usePoolGearData();
  const sampleDate = new Date();
  const graphChartData = [
    { key: "TEST", value: 0, date: new Date().setDate(sampleDate.getDate() + 1) },
    { key: "TEST", value: 10, date: new Date().setDate(sampleDate.getDate() + 2) },
    { key: "TEST2", value: 20, date: new Date().setDate(sampleDate.getDate() + 3) },
    { key: "TEST3", value: 30, date: new Date().setDate(sampleDate.getDate() + 4) },
    { key: "TEST", value: 40, date: new Date().setDate(sampleDate.getDate() + 5) },
    { key: "TEST2", value: 20, date: new Date().setDate(sampleDate.getDate() + 6) },
    { key: "TEST3", value: 60, date: new Date().setDate(sampleDate.getDate() + 7) },
    { key: "TEST", value: 10, date: new Date().setDate(sampleDate.getDate() + 8) },
    { key: "TEST2", value: 80, date: new Date().setDate(sampleDate.getDate() + 9) },
    { key: "TEST3", value: 70, date: new Date().setDate(sampleDate.getDate() + 10) },
    { key: "TEST", value: 60, date: new Date().setDate(sampleDate.getDate() + 11) },
    { key: "TEST2", value: 50, date: new Date().setDate(sampleDate.getDate() + 12) },
    { key: "TEST3", value: 30, date: new Date().setDate(sampleDate.getDate() + 13) },
    { key: "TEST", value: 100, date: new Date().setDate(sampleDate.getDate() + 14) },
    { key: "TEST2", value: 120, date: new Date().setDate(sampleDate.getDate() + 15) },
    { key: "TEST3", value: 130, date: new Date().setDate(sampleDate.getDate() + 16) },
  ];

  useEffect(() => {
    if (account) {
      fetchBalances(account);
    }
  }, [account, fetchBalances]);

  if (!tokensBalances || loading) return <Loading />;

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
          <Stack
            border="2px"
            alignItems="start"
            spacing="0px"
            direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          >
            <GraphChart chartData={graphChartData} width={660} />
          </Stack>
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
