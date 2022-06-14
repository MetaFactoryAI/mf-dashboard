/* eslint-disable camelcase */
import dayjs from "dayjs";
import { useState, useCallback } from "react";
import fetchGraph from "@/utils/graph/fetchGraph";
import { formatNumber } from "@/utils/presentationHelper";
import { METAFACTORY_GQL_URL } from "@/utils/constants";

export type DesignerReward = { robot_reward: number; product: { id: string; title: string } };
export type BuyerReward = { buyer_reward: number; date: string; order_number: string };
export type NftClaim = {
  to: string;
  erc1155: {
    contractAddress: string;
    ids: string[];
    values: number[];
  }[];
  erc721: never[];
  erc20: {
    contractAddresses: never[];
    amounts: never[];
  };
  salt: string;
  proof: string[];
};

type DesignerRewards = { total: number; items: DesignerReward[] };
type BuyerRewards = { total: number; items: BuyerReward[] };

const SUBGRAPH_ENDPOINTS: { [network: string]: string } = {
  metafactory: METAFACTORY_GQL_URL,
};

const useMetafactoryData = () => {
  const [nftClaims, setNftClaims] = useState<NftClaim>();
  const [designerRewards, setDesignerRewards] = useState<DesignerRewards>();
  const [buyerRewards, setBuyerRewards] = useState<BuyerRewards>();
  const [loadingNftClaims, setLoadingNftClaims] = useState(true);
  const [loadingDesigner, setLoadingDesigner] = useState(true);
  const [loadingBuyer, setLoadingBuyer] = useState(true);
  const [errors, setErrors] = useState({});

  const fetchDesignerRewards = (account: string, accountAuthToken: string) => {
    setLoadingDesigner(true);

    const DESIGNER_REWARDS_QUERY = `
      query DesignerRewards {
        robot_product_designer (where: {
          eth_address: {_eq: "${account.toLowerCase()}"}
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
          buyer_address: {_eq: "${account.toLowerCase()}"}
        }, order_by: {date: desc})
        {
          buyer_reward
          date
          order_number
        }
      }
    `;
    return (
      fetchGraph(SUBGRAPH_ENDPOINTS.metafactory, BUYER_REWARDS_QUERY, null, accountAuthToken)
        // @ts-ignore
        .then(({ data: { robot_order } }) =>
          setBuyerRewards({
            total: calculateTotalBuyerRewards(robot_order),
            items: normaliseRobotOrderItems(robot_order),
          }),
        )
        .catch((error) => setErrors(error))
        .finally(() => setLoadingBuyer(false))
    );
  };

  const fetchNftClaims = (accountAuthToken: string) => {
    setLoadingNftClaims(true);

    const NFT_CLAIMS_QUERY = `
      query GetClaimForAddress {
        robot_merkle_claims {
          claim_json
          merkle_root_hash
        }
      }
    `;
    return (
      fetchGraph(SUBGRAPH_ENDPOINTS.metafactory, NFT_CLAIMS_QUERY, null, accountAuthToken)
        // @ts-ignore
        .then(({ data }) => {
          // TODO: replace with actual data
          const tempData = {
            to: "0x4ee05f9DEDF5DC0d71490f39EBe6a85E202E1cB3",
            erc1155: [
              {
                contractAddress: "0xf9a28b227bDaC129eB85Ca3F27F55d1dD9ecFD94",
                ids: ["1", "16", "3", "18"],
                values: [1, 1, 1, 1],
              },
            ],
            erc721: [],
            erc20: { contractAddresses: [], amounts: [] },
            salt: "0xc3e34b08d1eb479f8eaa5cd048f0501540eec7921fd33c7eaad0f6862fbefb73",
            proof: [
              "0xdd38d42be5fe5231c4212355d869f4988fc7113fcfef008b7c38eeae93cf689b",
              "0xb370615c3a8c621d814d5c8f406e0276c06237a80e4109dbf72248fac745172e",
              "0x043d7a38247aba33f8be0615bcdbd3077c8b43cccc82dd368a6eac807e9f13cd",
              "0x4c08378e545357ecec83ab7273882d72713d53fadb557a5d28c77307f8c4482f",
            ],
          };
          setNftClaims(tempData);
        })
        .catch((error) => {
          setErrors({ error });
        })
        .finally(() => setLoadingNftClaims(false))
    );
  };

  return {
    designerRewards,
    buyerRewards,
    nftClaims,
    fetchDesignerRewards: useCallback(fetchDesignerRewards, []),
    fetchBuyerRewards: useCallback(fetchBuyerRewards, []),
    fetchNftClaims: useCallback(fetchNftClaims, []),
    loadingRewards: loadingBuyer || loadingDesigner,
    loadingNftClaims,
    errors,
  };
};

const calculateTotalDesignerRewards = (rewards: DesignerReward[]) =>
  rewards?.reduce((sum: number, reward: { robot_reward: number }) => sum + reward.robot_reward, 0);

const calculateTotalBuyerRewards = (rewards: BuyerReward[]) =>
  rewards?.reduce((sum: number, reward: { buyer_reward: number }) => sum + reward.buyer_reward, 0);

const normaliseRobotProductDesignerItems = (items: DesignerReward[]) =>
  items?.map((item) => ({
    ...item,
    product_title: item.product.title,
    product_id: item.product.id,
    amount: formatNumber(item.robot_reward),
  }));

const normaliseRobotOrderItems = (items: BuyerReward[]) =>
  items?.map((item) => ({
    ...item,
    date: dayjs(item.date, "YYYY-MM-DD").format("MM/DD/YYYY"),
    amount: formatNumber(item.buyer_reward),
  }));

export default useMetafactoryData;
