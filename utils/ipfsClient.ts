/* eslint-disable import/prefer-default-export */
import { IPFS_NODE } from "@/utils/constants";

// @ts-ignore
export const get = (ipfsHash, protocolType = "ipfs") => {
  const url = `https://${IPFS_NODE}/${protocolType}/${ipfsHash}`;

  return fetch(url).then((res) => res.json());
};
