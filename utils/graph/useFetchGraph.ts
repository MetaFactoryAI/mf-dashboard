/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import fetchGraph from "./fetchGraph";

type DesignerReward = { robot_reward: string };
type BuyerReward = { buyer_reward: string };

const SUBGRAPH_ENDPOINTS: { [network: string]: string } = {
  metafactory: "https://metafactory.hasura.app/v1/graphql",
};

const useFetchGraph = () => {
  const [designerRewards, setDesignerRewards] = useState({});
  const [buyerRewards, setBuyerRewards] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const fetchDesignerRewards = (account: string, accountAuthToken: string) => {
    setLoading(true);

    const DESIGNER_REWARDS_QUERY = `
      query DesignerRewards {
        robot_product_designer (where: {
          eth_address: {_eq: "${account}"}
        }){
          robot_reward
          product {
            title
            id
          }
        }
      }
    `;
    return (
      fetchGraph(SUBGRAPH_ENDPOINTS.metafactory, DESIGNER_REWARDS_QUERY, null, accountAuthToken)
        // @ts-ignore
        .then(({ data: { robot_product_designer } }) =>
          setDesignerRewards({
            total: calculateTotalDesignerRewards(robot_product_designer),
            items: robot_product_designer,
          }),
        )
        .catch((error) => setErrors({ error }))
        .finally(() => setLoading(false))
    );
  };

  const fetchBuyerRewards = (account: string, accountAuthToken: string) => {
    setLoading(true);

    const BUYER_REWARDS_QUERY = `
      query BuyerRewards {
        robot_order (where: {
          buyer_address: {_eq: "${account}"}
        }, order_by: {date: asc})
        {
          buyer_reward
          date
          order_id
        }
      }
    `;
    return (
      fetchGraph(SUBGRAPH_ENDPOINTS.metafactory, BUYER_REWARDS_QUERY, null, accountAuthToken)
        // @ts-ignore
        .then(({ data: { robot_order } }) =>
          setBuyerRewards({
            total: calculateTotalBuyerRewards(robot_order),
            items: robot_order,
          }),
        )
        .catch((error) => setErrors(error))
        .finally(() => setLoading(false))
    );
  };

  return {
    designerRewards,
    buyerRewards,
    fetchDesignerRewards: useCallback(fetchDesignerRewards, []),
    fetchBuyerRewards: useCallback(fetchBuyerRewards, []),
    loading,
    errors,
  };
};

const calculateTotalDesignerRewards = (rewards: DesignerReward[]) =>
  rewards?.reduce(
    (sum: number, reward: { robot_reward: string }) => sum + parseFloat(reward.robot_reward),
    0,
  );

const calculateTotalBuyerRewards = (rewards: BuyerReward[]) =>
  rewards?.reduce(
    (sum: number, reward: { buyer_reward: string }) => sum + parseFloat(reward.buyer_reward),
    0,
  );

export default useFetchGraph;
