/* eslint-disable camelcase */
import { ethers } from "ethers";
import { Merkle_redeem } from "types/ethers-contracts";
import { get } from "@/utils/ipfsClient";
import { loadTree } from "@/utils/merkle/merkleTree";

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
  redeemContract: Merkle_redeem,
  claimWeeks: Record<number, ClaimWeek>,
  address: string,
) => {
  const latestWeek = Math.max(...Object.keys(claimWeeks).map((numStr) => parseInt(numStr, 10)));
  const claimStatus = await redeemContract.claimStatus(address, 1, latestWeek);

  const unclaimedWeeks = claimStatus
    .map((value: boolean, index): [string, boolean] => [(index + 1).toString(), value])
    .filter((status) => !status[1])
    .map((status): string => status[0]);

  return unclaimedWeeks;
};

export const getIpfsSnapshot = () => {
  const url = `https://${process.env.NEXT_PUBLIC_IPFS_CLAIMS_SNAPSHOT_URL}`;

  return fetch(url).then((res) => res.json());
};

export const getUnclaimedWeeksValues = (
  claimWeeks: Record<number, ClaimWeek>,
  unclaimedWeeks: string[],
  address: string,
) =>
  Object.fromEntries(
    Object.entries(claimWeeks)
      .map((report) => [report[0], report[1][address] || 0])
      .filter((report) => unclaimedWeeks.includes(report[0].toString()) && report[1] > 0),
  );

export const getClaimedWeeksValues = (
  claimWeeks: Record<number, ClaimWeek>,
  unclaimedWeeks: string[],
  address: string,
) =>
  Object.fromEntries(
    Object.entries(claimWeeks)
      .map((report) => [report[0], report[1][address] || 0])
      .filter((report) => !unclaimedWeeks.includes(report[0].toString()) && report[1] > 0),
  );

export const getWeekValuesTotal = (unclaimedWeeksValues: { [key: number | string]: string }) => {
  const weeks = Object.keys(unclaimedWeeksValues);

  return weeks.reduce(
    (sum: number, week: number | string) => sum + parseFloat(unclaimedWeeksValues[week]),
    0,
  );
};

export const getClaimsWeeksProofs = (
  claimWeeks: Record<number, ClaimWeek>,
  unclaimedWeeksValues: { [key: number]: string },
  address: string,
) => {
  const weeks = Object.keys(unclaimedWeeksValues);

  return weeks.map((week) => {
    const weeknumber = parseInt(week, 10);
    const claimBalance = claimWeeks[weeknumber][address];
    const merkleTree = loadTree(claimWeeks[weeknumber]);
    const merkleProof = merkleTree.getHexProof(
      ethers.utils.solidityKeccak256(
        ["address", "uint256"],
        [address, ethers.utils.parseEther(claimBalance.toString())],
      ),
    );
    return {
      week: parseInt(week, 10),
      balance: ethers.utils.parseEther(claimBalance.toString()),
      merkleProof,
    };
  });
};
