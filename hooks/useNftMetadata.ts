/* eslint-disable camelcase */
import { useState, useCallback } from "react";

export type NftItem = {
  nft_token_id: number;
  id: number;
  nft_metadata: {
    name: string;
    properties: {
      brand: string;
      images: string[];
    };
  };
};

export type NftData = {
  name: string;
  properties: {
    brand: string;
    images: string[];
  };
};

const useNftMetadata = () => {
  const [nfts, setNfts] = useState<{ [key: string]: NftItem }>();
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState<NftData>();

  const fetchNfts = () => {
    setLoading(true);

    fetch("api/nfts")
      .then((res) => res.json())
      .then((data) => {
        const normalisedData = data.reduce((result: Record<string, NftItem>, nft: NftItem) => {
          const key = nft.nft_token_id;
          const newResult = result;
          newResult[key] = nft;

          return newResult;
        }, {});
        setNfts(normalisedData);
      })
      .finally(() => setLoading(false));
  };

  const fetchNft = (id: string | string[]) => {
    setLoading(true);

    fetch(`/api/nfts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNftData(data);
      })
      .finally(() => setLoading(false));
  };

  const parseIds = () => {
    if (!nfts) return [];

    return Object.keys(nfts).map((key: string) => nfts[key].nft_token_id);
  };

  return {
    nfts,
    nftData,
    fetchNft: useCallback(fetchNft, []),
    fetchNfts: useCallback(fetchNfts, []),
    getNftIds: useCallback(parseIds, [nfts]),
    loading,
  };
};

export default useNftMetadata;
