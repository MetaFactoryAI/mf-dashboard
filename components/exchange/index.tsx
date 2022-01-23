import { Grid, GridItem, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { TimeRangeGraphChart, Loading, PageTitle } from "@/components/atoms";
import { useWeb3Context } from "@/contexts/Web3Context";
import { usePoolGearData } from "@/hooks/usePoolGearData";
import SwapPoolPanel from "./swapPoolPanel";
import { getHistoryRangeTimestamps, HistoryRange } from "@/utils/time";
import type { ChartTab } from "@/components/atoms/chart/SelectButtons";
import type { PoolSnapshot } from "@/hooks/usePoolGearData";

const Exchange: NextPage = () => {
  const TIME_TABS: ChartTab[] = useMemo(
    () => [
      {
        title: "W",
        key: HistoryRange.Week,
      },
      {
        title: "M",
        key: HistoryRange.Month,
      },
      {
        title: "Y",
        key: HistoryRange.Year,
      },
    ],
    [],
  );
  const { account } = useWeb3Context();
  const {
    fetchBalances,
    tokensBalances,
    loadingBalances,
    fetchPoolHistory,
    poolHistory,
    loadingPoolHistory,
  } = usePoolGearData();

  const [selectedTimeRange, setSelectedTimeRange] = useState<HistoryRange>(HistoryRange.Year);

  useEffect(() => {
    if (account) {
      const { startTimestamp, endTimestamp } = getHistoryRangeTimestamps(selectedTimeRange);

      fetchPoolHistory(startTimestamp, endTimestamp);
    }
  }, [account, fetchPoolHistory, selectedTimeRange]);

  useEffect(() => {
    if (account) {
      fetchBalances(account);
    }
  }, [account, fetchBalances]);

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
            <TimeRangeGraphChart
              chartData={poolHistory as PoolSnapshot[]}
              titleText="$ROBOT + $WETH"
              titleValue="$30"
              titleColor="black"
              handleOptionClickCallback={setSelectedTimeRange}
              selectOptions={TIME_TABS}
              selectedOption={selectedTimeRange}
            />
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
