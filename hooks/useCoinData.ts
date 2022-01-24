/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import type { ChartData } from "@/components/atoms/TimeRangeGraphChart";
import { formatNumber } from "@/utils/presentationHelper";

export type TokenBalance = { userBalance: number; symbol: string };

type CoinSnapshots = {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
};

export type CoinData = {
  swapFee: number;
  totalSwapVolume: string;
  totalLiquidity: number;
  holdersCount: string;
};

export const useCoinData = () => {
  const [coinChartHistory, setCoinChartHistory] = useState<ChartData[]>();
  const [loadingCoinChartHistory, setLoadingCoinChartHistory] = useState(false);
  const [coinData, setCoinData] = useState<ChartData[]>();
  const [loadingCoinData, setloadingCoinData] = useState(false);

  const fetchCoinData = async (coinId: string) => {
    setLoadingCoinChartHistory(true);

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${startTimestamp}&to=${endTimestamp}`,
    );
    const parsedResponse = await response.json();
    const normalizedSnapshots = normalizeSnapshotsForChart(parsedResponse);

    setCoinChartHistory(normalizedSnapshots);
    setLoadingCoinChartHistory(false);
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
