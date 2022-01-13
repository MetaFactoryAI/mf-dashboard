/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import fetchGraph from "@/utils/graph/fetchGraph";
import { formatNumber } from "@/utils/presentationHelper";

type DesignerReward = { robot_reward: number; product: { id: string; title: string } };
type BuyerReward = { buyer_reward: number; date: string; order_id: string };

const SUBGRAPH_ENDPOINTS: { [network: string]: string } = {
  metafactory: "https://metafactory.hasura.app/v1/graphql",
};

const useFetchMetafactoryGraph = () => {
  const [designerRewards, setDesignerRewards] = useState({});
  const [buyerRewards, setBuyerRewards] = useState({});
  const [loadingDesigner, setLoadingDesigner] = useState(true);
  const [loadingBuyer, setLoadingBuyer] = useState(true);
  const [errors, setErrors] = useState({});

  const fetchDesignerRewards = (account: string, accountAuthToken: string) => {
    setLoadingDesigner(true);

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
            items: normaliseRobotProductDesignerItems(robot_product_designer),
          }),
        )
        .catch((error) => setErrors({ error }))
        .finally(() => setLoadingDesigner(false))
    );
  };

  const fetchBuyerRewards = (account: string, accountAuthToken: string) => {
    setLoadingBuyer(true);

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
        .finally(() => setLoadingBuyer(false))
    );
  };

  return {
    designerRewards,
    buyerRewards,
    fetchDesignerRewards: useCallback(fetchDesignerRewards, []),
    fetchBuyerRewards: useCallback(fetchBuyerRewards, []),
    loading: loadingBuyer || loadingDesigner,
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

const normaliseRobotProductDesignerItems = (items: DesignerReward[]) =>
  items?.map((item) => ({
    ...item,
    product_title: item.product.title,
    product_id: item.product.id,
    amount: formatNumber(item.robot_reward),
  }));

export default useFetchMetafactoryGraph;