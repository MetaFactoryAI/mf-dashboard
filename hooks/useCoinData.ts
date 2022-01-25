/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import type { ChartData } from "@/components/atoms/TimeRangeGraphChart";
import { formatNumber } from "@/utils/presentationHelper";
import { BALANCER_POOL_ADDR } from "@/utils/constants";

export type TokenBalance = { userBalance: number; symbol: string };

type CoinSnapshots = {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
};

export type CoinData = { title: string; value: string | number };

export const useCoinData = () => {
  const [coinChartHistory, setCoinChartHistory] = useState<ChartData[]>();
  const [loadingCoinChartHistory, setLoadingCoinChartHistory] = useState(false);
  const [coinData, setCoinData] = useState<CoinData[]>();
  const [loadingCoinData, setloadingCoinData] = useState(false);

  const fetchCoinData = async (coinId: string) => {
    setloadingCoinData(true);

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const { market_data, contract_address } = await response.json();
    const normalizedResponse = [
      { title: "Current Price", value: market_data.current_price.usd },
      { title: "Total Volume", value: `$${market_data.total_volume.usd}` },
      { title: "All Time High", value: `$${market_data.ath.usd}` },
      {
        title: "Price Change 24h:",
        value: `${formatNumber(parseFloat(market_data.price_change_24h))}%`,
      },
      { title: "Market Cap:", value: market_data.market_cap.usd },
      { title: "Fully Diluted Valuation:", value: market_data.fully_diluted_valuation.usd },
      { title: "Circulating Supply:", value: parseInt(market_data.circulating_supply, 10) },
      { title: "Max Supply:", value: market_data.max_supply },
      { title: "Contract Address:", value: contract_address },
      { title: "Pool Address:", value: BALANCER_POOL_ADDR },
    ];

    setCoinData(normalizedResponse);
    setloadingCoinData(false);
  };

  const fetchCoinHistory = async (coinId: string, startTimestamp: number, endTimestamp: number) => {
    setLoadingCoinChartHistory(true);

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${startTimestamp}&to=${endTimestamp}`,
    );
    const parsedResponse = await response.json();
    const normalizedSnapshots = normalizeSnapshotsForChart(parsedResponse);

    setCoinChartHistory(normalizedSnapshots);
    setLoadingCoinChartHistory(false);
  };

  return {
    fetchCoinHistory: useCallback(fetchCoinHistory, []),
    fetchCoinData: useCallback(fetchCoinData, []),
    coinChartHistory,
    loadingCoinChartHistory,
    coinData,
    loadingCoinData,
  };
};

const normalizeSnapshotsForChart = (snapshots: CoinSnapshots): ChartData[] =>
  snapshots.prices.map(
    (price: number[], index): ChartData => ({
      key: price[0].toString(),
      date: new Date(price[0]),
      value: price[1],
      toolBarTitle: `Volume: $${formatNumber(snapshots.total_volumes[index][1])}`,
    }),
  );
