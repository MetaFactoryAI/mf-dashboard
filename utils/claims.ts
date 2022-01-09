import { ethers } from "ethers";
import { IPFS_CLAIMS_SNAPSHOT_URL } from "@/utils/constants";
import { get } from "@/utils/ipfsClient";
import { loadTree } from "@/utils/merkle/merkleTree";

export interface ClaimWeek {
  [address: string]: number;
}

export const getClaimWeeks = async () => {
  const snapshot = await getIpfsSnapshot();
  const claimWeeks: Record<number, ClaimWeek> = {};

  await Promise.all(
    Object.keys(snapshot).map(async (week) => {
      claimWeeks[week] = await get(snapshot[week]);
    }),
  );

  return claimWeeks;
};

export const getUnclaimedWeeksForAddress = async (redeemCotnract, claimWeeks, address) => {
  const latestWeek = Math.max(...Object.keys(claimWeeks).map((numStr) => parseInt(numStr, 10)));
  const claimStatus = await redeemCotnract.claimStatus(address, 1, latestWeek);

  const unclaimedWeeks = Object.entries(claimStatus)
    .filter((status) => !status[1])
    .map((status) => status[0]);

  return unclaimedWeeks;
};

export const getIpfsSnapshot = () => {
  const url = `https://${IPFS_CLAIMS_SNAPSHOT_URL}`;

  return fetch(url).then((res) => res.json());
};

export const getUnclaimedWeeksValues = (claimWeeks, unclaimedWeeks, address) =>
  Object.fromEntries(
    Object.entries(claimWeeks)
      .map((report) => [report[0], report[1][address] || 0])
      .filter((report) => unclaimedWeeks.includes(report[0]) && report[1] > 0),
  );

export const getClaimedWeeksValues = (claimWeeks, unclaimedWeeks, address) =>
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