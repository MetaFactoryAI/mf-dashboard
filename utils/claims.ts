import { ethers } from "ethers";
import { IPFS_CLAIMS_SNAPSHOT_URL } from "@/utils/constants";
import { get } from "@/utils/ipfsClient";
import { loadTree } from "@/utils/merkle/merkleTree";
import { MerkleRedeem } from "types/ethers-contracts";

export interface ClaimWeek {
  [address: string]: number;
}

export const getClaimWeeks = async () => {
  const snapshot = await getIpfsSnapshot();
  const claimWeeks: Record<number, ClaimWeek> = {};

  await Promise.all(
    Object.keys(snapshot).map(async (week: string) => {
      const weeknumber = parseInt(week, 10);

      claimWeeks[weeknumber] = await get(snapshot[week]);
    }),
  );

  return claimWeeks;
};

export const getUnclaimedWeeksForAddress = async (
  redeemContract: MerkleRedeem,
  claimWeeks: string[],
  address: string,
) => {
  const latestWeek = Math.max(...Object.keys(claimWeeks).map((numStr) => parseInt(numStr, 10)));
  const claimStatus = await redeemContract.claimStatus(address, 1, latestWeek);

  const unclaimedWeeks = Object.entries(claimStatus)
    .filter((status) => !status[1])
    .map((status) => status[0]);

  return unclaimedWeeks;
};

export const getIpfsSnapshot = () => {
  const url = `https://${IPFS_CLAIMS_SNAPSHOT_URL}`;

  return fetch(url).then((res) => res.json());
};

export const getUnclaimedWeeksValues = (
  claimWeeks: string[],
  unclaimedWeeks: string[],
  address: string,
) =>
  Object.fromEntries(
    Object.entries(claimWeeks)
      .map((report) => [report[0], report[1][address] || 0])
      .filter((report) => unclaimedWeeks.includes(report[0]) && report[1] > 0),
  );

export const getClaimedWeeksValues = (
  claimWeeks: string[],
  unclaimedWeeks: string[],
  address: string,
) =>
  Object.fromEntries(
    Object.entries(claimWeeks)
      .map((report) => [report[0], report[1][address] || 0])
      .filter((report) => !unclaimedWeeks.includes(report[0]) && report[1] > 0),
  );

export const getWeekValuesTotal = (unclaimedWeeksValues) => {
  const weeks = Object.keys(unclaimedWeeksValues);

  return weeks.reduce((sum, week) => sum + unclaimedWeeksValues[week], 0);
};

export const getClaimsWeeksProofs = (claimWeeks, unclaimedWeeksValues, address) => {
  const weeks = Object.keys(unclaimedWeeksValues);

  return weeks.map((week) => {
    const claimBalance = claimWeeks[week][address];
    const merkleTree = loadTree(claimWeeks[week]);
    const merkleProof = merkleTree.getHexProof(
      ethers.utils.solidityKeccak256(
        ["address", "uint256"],
        [address, ethers.utils.parseEther(claimBalance)],
      ),
    );

    return [parseInt(week, 10), ethers.utils.parseEther(claimBalance), merkleProof];
  });
}