import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { format } from "d3-format";
import { TimeRangeGraphChart, Loading, PageTitle } from "@/components/atoms";
import { useWeb3Context } from "@/contexts/Web3Context";
import { usePoolGearData } from "@/hooks/usePoolGearData";
import { useCoinData } from "@/hooks/useCoinData";
import { SwapPoolPanel, SwapPoolPanelTabs } from "./swapPoolPanel";
import { getHistoryRangeTimestamps, HistoryRange } from "@/utils/time";
import SummaryField from "./shared/SummaryField";
import type { ChartTab } from "@/components/atoms/chart/SelectButtons";
import CoinDataSummary from "./CoinDataSummary";
import { formatNumber } from "@/utils/presentationHelper";

const COIN_ID = "robot";

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
  const [selectedSwapPoolTab, setSelectedSwapPoolTab] = useState<SwapPoolPanelTabs>(
    SwapPoolPanelTabs.SwapTab,
  );
  const { fetchCoinHistory, coinChartHistory, fetchCoinData, coinData } = useCoinData();
  const [selectedTimeRange, setSelectedTimeRange] = useState<HistoryRange>(HistoryRange.Year);

  useEffect(() => {
    const { startTimestamp, endTimestamp } = getHistoryRangeTimestamps(selectedTimeRange);

    fetchPoolHistory(startTimestamp, endTimestamp);
    fetchCoinHistory(COIN_ID, startTimestamp, endTimestamp);
    fetchPoolData();
    fetchCoinData(COIN_ID);
  }, [fetchCoinData, fetchCoinHistory, fetchPoolData, fetchPoolHistory, selectedTimeRange]);

  useEffect(() => {
    if (account) {
      fetchBalances(account);
    }
  }, [account, fetchBalances]);

  if (
    !tokensBalances ||
    loadingBalances ||
    loadingPoolChartHistory ||
    !poolChartHistory ||
    loadingPoolData ||
    !poolData ||
    !coinChartHistory ||
    !coinData
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
          <SwapPoolPanel
            tokensBalances={tokensBalances}
            tabClickCallback={setSelectedSwapPoolTab}
            selectedTab={selectedSwapPoolTab}
          />
        </GridItem>
        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
          <Box border="2px" borderLeft="0px" spacing="0px">
            <TimeRangeGraphChart
              chartData={
                selectedSwapPoolTab === SwapPoolPanelTabs.PoolTab
                  ? poolChartHistory
                  : coinChartHistory
              }
              titleText={
                selectedSwapPoolTab === SwapPoolPanelTabs.PoolTab ? "$ROBOT + $WETH" : "$ROBOT"
              }
              titleValue={
                selectedSwapPoolTab === SwapPoolPanelTabs.PoolTab
                  ? `$${format(".2s")(poolData.totalLiquidity)}`
                  : `$${formatNumber(
                      // @ts-ignore
                      coinData?.chartSummary?.find(({ title }) => title === "Current Price").value,
                    )}`
              }
              titleColor={selectedSwapPoolTab === SwapPoolPanelTabs.PoolTab ? "black" : "#8B2CFF"}
              handleOptionClickCallback={setSelectedTimeRange}
              selectOptions={TIME_TABS}
              selectedOption={selectedTimeRange}
            />
          </Box>
          {/* TODO refactor: move below to isolated component */}
          {selectedSwapPoolTab === SwapPoolPanelTabs.PoolTab && (
            <Grid templateColumns="repeat(3, 1fr)" width="100%">
              <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}>
                <SummaryField title="Holders" value={poolData.holdersCount} />
              </GridItem>
              <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}>
                <SummaryField
                  title="Total Swap Vol"
                  value={`$${format(".2s")(parseFloat(poolData.totalSwapVolume))}`}
                />
              </GridItem>
              <GridItem colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}>
                <SummaryField title="Swap fee" value={`${poolData.swapFee * 100}%`} />
              </GridItem>
            </Grid>
          )}
          {selectedSwapPoolTab === SwapPoolPanelTabs.SwapTab && (
            <Grid templateColumns="repeat(3, 1fr)" width="100%">
              {/* take first few values which will be shown under the Chart in the main page */}
              {coinData.chartSummary.slice(1, 4).map((element) => (
                <GridItem
                  colSpan={{ base: 3, sm: 3, md: 1, lg: 1 }}
                  key={`exchange-chart-sum-${element.title}`}
                >
                  <SummaryField title={element.title} value={element.value.toString()} />
                </GridItem>
              ))}
            </Grid>
          )}
        </GridItem>
        <GridItem
          colSpan={{ md: 3, lg: 3 }}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          ml="30px"
        >
          <SwapPoolPanel
            tokensBalances={tokensBalances}
            tabClickCallback={setSelectedSwapPoolTab}
            selectedTab={selectedSwapPoolTab}
          />
        </GridItem>

        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }} p="40px">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="16px">
            MetaFactory is a community-owned culture studio and marketplace focused on the creation
            and sale of digi-physical goods that celebrate crypto. Artists of all types are invited
            to create products that promote their art, community, project, protocol, token, etc. We
            abstract away all the production and logistics with our network of fashion houses and
            production partners in California and Sweden, so creators can focus on their craft while
            MetaFactory facilitates creation, fulfillment, sales and support.
          </Text>
          {selectedSwapPoolTab === SwapPoolPanelTabs.SwapTab && (
            <CoinDataSummary coinData={coinData.tableSummary} />
          )}
        </GridItem>
      </Grid>
      <Box />
    </Box>
  );
};

export default Exchange;
