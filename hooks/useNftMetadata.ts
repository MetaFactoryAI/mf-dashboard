/* eslint-disable camelcase */
import { useState, useCallback } from "react";

export type DesignerReward = { robot_reward: number; product: { id: string; title: string } };

const useNftMetadata = () => {
  const [nftIds, setnftIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState(true);

  const fetchNft = () => {
    setLoadingIds(true);

    fetch("api/nft_metadata")
      .then((res) => res.json())
      .then((data) => {
        const parsedIds = parseIds(data);
        setnftIds(parsedIds);
        setLoadingIds(false);
      });
  };

  return {
    nftIds,
    fetchNft: useCallback(fetchNft, []),
    loading: loadingIds,
  };
};

const parseIds = (data) => {
  if (!data) return [];

  return data?.map((nft) => nft.nft_token_id);
};

export default useNftMetadata;
