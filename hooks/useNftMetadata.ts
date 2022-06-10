/* eslint-disable camelcase */
import { useState, useCallback } from "react";

export type NftItem = { nft_token_id: number };

const useNftMetadata = () => {
  const [nftIds, setnftIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState(true);
  const [nftData, setNftData] = useState(null);
  const [loadingNftData, setLoadingNftData] = useState(true);

  const fetchNfts = () => {
    setLoadingIds(true);

    fetch("api/nfts")
      .then((res) => res.json())
      .then((data) => {
        const parsedIds = parseIds(data);
        setnftIds(parsedIds);
      })
      .finally(() => setLoadingIds(false));
  };

  const fetchNft = (id: number) => {
    setLoadingNftData(true);

    fetch(`/api/nfts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNftData(data);
      })
      .finally(() => setLoadingNftData(false));
  };

  return {
    nftIds,
    nftData,
    fetchNft: useCallback(fetchNft, []),
    fetchNfts: useCallback(fetchNfts, []),
    loading: loadingIds && loadingNftData,
  };
};

const parseIds = (data: NftItem[]) => {
  if (!data) return [];

  return data.map((nft) => nft.nft_token_id);
};

export default useNftMetadata;
