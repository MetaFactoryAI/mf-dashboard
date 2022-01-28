/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import dayjs from "dayjs";
import fetchGraph from "@/utils/graph/fetchGraph";
import { BALANCER_POOL_ID, BALANCER_GQL_URL } from "@/utils/constants";
import type { ChartData } from "@/components/atoms/TimeRangeGraphChart";
import { formatNumber } from "@/utils/presentationHelper";

export type TokenBalance = { balance: number; symbol: string };

type PoolSnapshot = {
  amounts: number[];
  totalShares: string;
  swapFees: string;
  swapVolume: string;
  liquidity: string;
  timestamp: number;
  date: Date;
  chartValue: number;
  swapFeePercent: number;
};

export type PoolData = {
  swapFee: number;
  totalSwapVolume: string;
  totalLiquidity: number;
  holdersCount: string;
};

const SUBGRAPH_ENDPOINTS: { [network: string]: string } = {
  balancerV2Graph: BALANCER_GQL_URL,
};

type PoolToken = { balance: string; symbol: string };

export const usePoolGearData = () => {
  const [tokensBalances, setTokensBalances] = useState<TokenBalance[]>();
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [poolChartHistory, setPoolChartHistory] = useState<ChartData[]>();
  const [loadingPoolChartHistory, setLoadingPoolChartHistory] = useState(false);
  const [poolData, setPoolData] = useState<PoolData>();
  const [loadingPoolData, setLoadingPoolData] = useState(false);

  const fetchBalances = async (account: string) => {
    setLoadingBalances(true);

    const POOL_TOKENS = `
      query PoolTokens {
        poolTokens(where: {poolId:"${BALANCER_POOL_ID}"}){
          symbol
          balance
        }
      }
    `;

    const USER_POOL_SHARES = `
      query UserPoolShares {
        poolShares(where: {poolId:"${BALANCER_POOL_ID}", userAddress:"${account.toLowerCase()}"}){
          balance
        }
      }
    `;

    const TOTAL_POOL_SHARES = `
      query TotalPoolShares {
        pool(id: "${BALANCER_POOL_ID}"){
          totalShares
        }
      }
    `;

    const {
      data: { poolTokens },
    } = await fetchGraph(SUBGRAPH_ENDPOINTS.balancerV2Graph, POOL_TOKENS, null);

    const {
      data: { poolShares: userPoolShares },
    } = await fetchGraph(SUBGRAPH_ENDPOINTS.balancerV2Graph, USER_POOL_SHARES, null);
    const userPoolShare = userPoolShares.length > 0 ? parseFloat(userPoolShares[0].balance) : 0;

    const {
      data: {
        pool: { totalShares: totalShare },
      },
    } = await fetchGraph(SUBGRAPH_ENDPOINTS.balancerV2Graph, TOTAL_POOL_SHARES, null);
    const totalPoolshare = parseFloat(totalShare);

    const userTokenBalances = poolTokens.map((token: PoolToken): TokenBalance => {
      const totalBalance = parseFloat(token.balance);
      const userShareProportion = userPoolShare / totalPoolshare;
      const userBalance = totalBalance * userShareProportion;

      return { symbol: token.symbol, balance: userBalance };
    });

    setLoadingBalances(false);
    setTokensBalances(userTokenBalances);
  };

  const fetchPoolData = async () => {
    setLoadingPoolData(true);

    const POOL_DATA = `
      query PoolTokens {
        pool(id: "${BALANCER_POOL_ID}"){
          swapFee
          totalSwapVolume
          totalLiquidity
          holdersCount
        }
      }
    `;
    const {
      data: { pool },
    } = await fetchGraph(SUBGRAPH_ENDPOINTS.balancerV2Graph, POOL_DATA, null);

    setPoolData(pool);
    setLoadingPoolData(false);
  };

  const fetchPoolHistory = async (startTimestamp: number, endTimestamp: number) => {
    setLoadingPoolChartHistory(true);

    const skipStep = 70;
    const fetchBatch = async (skip: number): Promise<PoolSnapshot[]> => {
      const POOL_SNAPSHOTS = `
        query PoolSnapshots {
          poolSnapshots(skip: ${skip}, first: ${skipStep}, where:
            { pool: "${BALANCER_POOL_ID}",
              timestamp_gte: ${startTimestamp},
              timestamp_lt: ${endTimestamp}
            }) {
            amounts
            totalShares
            swapFees
            swapVolume
            liquidity
            timestamp
          }
        }
      `;

      const {
        data: { poolSnapshots },
      } = await fetchGraph(SUBGRAPH_ENDPOINTS.balancerV2Graph, POOL_SNAPSHOTS, null);

      if (poolSnapshots.length > 0) {
        const batch = await fetchBatch(skip + skipStep);
        return [...poolSnapshots, ...batch];
      }

      return [];
    };
    const result = await fetchBatch(0);
    const normalizedSnapshots = normalizeSnapshotsForChart(result);

    setPoolChartHistory(normalizedSnapshots);
    setLoadingPoolChartHistory(false);
  };

  return {
    fetchBalances: useCallback(fetchBalances, []),
    fetchPoolHistory: useCallback(fetchPoolHistory, []),
    fetchPoolData: useCallback(fetchPoolData, []),
    loadingBalances,
    tokensBalances,
    loadingPoolChartHistory,
    loadingPoolData,
    poolChartHistory,
    poolData,
  };
};

const normalizeSnapshotsForChart = (snapshots: PoolSnapshot[]): ChartData[] =>
  snapshots.map(
    (snapshot: PoolSnapshot): ChartData => ({
      key: snapshot.timestamp.toString(),
      date: dayjs.unix(snapshot.timestamp).toDate(),
      value: parseFloat(snapshot.liquidity),
      toolBarTitle: `Volume: ${formatNumber(parseFloat(snapshot.swapVolume))}`,
    }),
  );
