/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import fetchGraph from "@/utils/graph/fetchGraph";
import { BALANCER_POOL_ID, BALANCER_GQL_URL } from "@/utils/constants";

type PoolToken = { balance: string; symbol: string };
export type TokenBalance = { userBalance: number; symbol: string };

const SUBGRAPH_ENDPOINTS: { [network: string]: string } = {
  balancerV2Graph: BALANCER_GQL_URL,
};

const usePoolGearData = () => {
  const [tokensBalances, setTokensBalances] = useState<TokenBalance[]>();
  const [loading, setLoading] = useState(false);

  const fetchBalances = async (account: string) => {
    setLoading(true);

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

      return { symbol: token.symbol, userBalance };
    });

    setLoading(false);
    setTokensBalances(userTokenBalances);
  };

  return {
    fetchBalances: useCallback(fetchBalances, []),
    loading,
    tokensBalances,
  };
};

export default usePoolGearData;
