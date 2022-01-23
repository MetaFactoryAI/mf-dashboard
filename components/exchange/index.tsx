import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { format } from "d3-format";
import { TimeRangeGraphChart, Loading, PageTitle } from "@/components/atoms";
import { useWeb3Context } from "@/contexts/Web3Context";
import { usePoolGearData } from "@/hooks/usePoolGearData";
import SwapPoolPanel from "./swapPoolPanel";
import { getHistoryRangeTimestamps, HistoryRange } from "@/utils/time";
import SummaryField from "./SummaryField";
import type { ChartTab } from "@/components/atoms/chart/SelectButtons";

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
    fetchPoolData,
    loadingPoolData,
    poolData,
    poolChartHistory,
    loadingPoolChartHistory,
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

  useEffect(() => {
    fetchPoolData();
  }, [fetchPoolData]);

  if (
    !tokensBalances ||
    loadingBalances ||
    loadingPoolChartHistory ||
    !poolChartHistory ||
    loadingPoolData ||
    !poolData
  )
    return <Loading />;

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
              chartData={poolChartHistory}
              titleText="$ROBOT + $WETH"
              titleValue={`$${format(".2s")(poolData.totalLiquidity)}`}
              titleColor="black"
              handleOptionClickCallback={setSelectedTimeRange}
              selectOptions={TIME_TABS}
              selectedOption={selectedTimeRange}
            />
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" width="100%">
            <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}>
              <SummaryField title="Holders" value={poolData.holdersCount} />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}>
              <SummaryField
                title="Total Swap Volume"
                value={`$${format(".2s")(parseFloat(poolData.totalSwapVolume))}`}
              />
            </GridItem>
            <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}>
              <SummaryField title="Swap fee" value={`${poolData.swapFee * 100}%`} />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          colSpan={{ md: 3, lg: 3 }}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          ml="30px"
        >
          <SwapPoolPanel tokensBalances={tokensBalances} />
        </GridItem>

        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }} borderBottom="2px" p="40px">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            MetaFactory is a community-owned culture studio and marketplace focused on the creation
            and sale of digi-physical goods that celebrate crypto. Artists of all types are invited
            to create products that promote their art, community, project, protocol, token, etc. We
            abstract away all the production and logistics with our network of fashion houses and
            production partners in California and Sweden, so creators can focus on their craft while
            MetaFactory facilitates creation, fulfillment, sales and support.
          </Text>
        </GridItem>
      </Grid>
      <Box />
    </Box>
  );
};

export default Exchange;
