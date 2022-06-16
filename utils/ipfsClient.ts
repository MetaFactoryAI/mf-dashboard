/* eslint-disable import/prefer-default-export */

// @ts-ignore
export const get = (ipfsHash, protocolType = "ipfs") => {
  const url = `https://${process.env.NEXT_PUBLIC_IPFS_NODE}/${protocolType}/${ipfsHash}`;

  return fetch(url).then((res) => res.json());
};
