/* eslint-disable camelcase */
import { useState, useCallback } from "react";

export type NftItem = {
  nft_token_id: number;
  id: number;
  nft_metadata: {
    name: string;
    image: string;
    files: { uri: string; mimeType: string }[];
    properties: {
      brand: string;
      images: string[];
    };
  };
};

export type NftData = {
  name: string;
  glbFile: string | undefined;
  files: { uri: string; mimeType: string }[];
  properties: {
    brand: string;
    images: string[];
    creators: {
      name: string;
      role: string;
    }[];
    style: string;
    releaseDate: { name: string; value: string } | undefined;
    madeIn: { name: string; value: string } | undefined;
    designer: string;
    technician: string;
  };
};

const useNftMetadata = () => {
  const [nfts, setNfts] = useState<{ [key: string]: NftItem }>();
  const [loading, setLoading] = useState(true);
  const [nftData, setNftData] = useState<NftData | null>(null);

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
      .then((data: NftData) => {
        const currentData = { ...data };
        const glbFile = data.files.find((file) => file.mimeType === "model/gltf-binary");
        const designer =
          data.properties.creators.find((creator) => creator.role.toLowerCase() === "designer")
            ?.name || "N/A";
        const technician =
          data.properties.creators.find((creator) => creator.role.toLowerCase() === "technician")
            ?.name || "N/A";
        currentData.glbFile = glbFile?.uri;
        currentData.properties = { ...currentData.properties, designer, technician };

        setNftData(currentData);
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
