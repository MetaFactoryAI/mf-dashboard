/* eslint-disable no-underscore-dangle */
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { ClaimedEvent } from "types/ethers-contracts/MerkleRedeem";
import { ethers } from "ethers";
import moment from "moment";
import dayjs from "dayjs";
import type { ChartData } from "@/components/atoms/YearlyBarChart";

type MonthlyStartBlock = {
  date: Date;
  dateTimestamp: number;
  block: number;
  timestmamp: number;
};

export const formatClaimsEventData = (
  claims: ClaimedEvent[],
  monthlyStartBlocks: MonthlyStartBlock[],
) =>
  claims.map((claim) => {
    const monthDate = assignMonthToBlock(claim.blockNumber, monthlyStartBlocks);

    return {
      avatarSrc: "/avatar-default.svg",
      address: formatAddress(claim.args._claimant),
      amount: Number(ethers.utils.formatEther(claim.args._balance)).toFixed(2),
      date: dayjs(monthDate).valueOf(),
      // specific fields handled in @/components/Table to redirect on click
      redirectLink: `https://etherscan.io/tx/${claim.transactionHash}`,
      redirectValue: formatAddress(claim.transactionHash),
    };
  });


// export const formatClaimsEventData = async (claims: ClaimedEvent[]) =>
//   Promise.all(
//     claims.map((claim) =>
//       claim.getBlock().then((block) => {
//         const dateFormatOptions = {
//           year: "numeric",
//           month: "numeric",
//         };
//         const blockDateTime = new Date(block.timestamp * 1000);
//         // @ts-ignore
//         const blockDateTimeFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);
// console.log(blockDateTimeFormat.format(blockDateTime),)
//         return {
//           avatarSrc: "/avatar-default.svg",
//           address: formatAddress(claim.args._claimant),
//           date: blockDateTimeFormat.format(blockDateTime).valueOf(),
//           amount: Number(ethers.utils.formatEther(claim.args._balance)).toFixed(2),
//         };
//       }),
//     ),
//   );


// @ts-ignore
export const formatMonthlyClaimsEventData = (claims): ChartData[] => {
  // @ts-ignore
  const reducedClaims = claims.reduce((sum, claim) => {
    const previousSum = sum[claim.date] ? Number(sum[claim.date]) : 0;
    const currentSum = previousSum + Number(claim.amount);

    // eslint-disable-next-line no-param-reassign
    sum[claim.date] = currentSum;

    return sum;
  }, {});

  return Object.keys(reducedClaims).map((claimKey) => ({
    key: `yearlyBarChartData${claimKey}`,
    value: reducedClaims[claimKey].toFixed(1),
    date: Number(claimKey),
  }));
};

export const formatAddress = (
  address: string | null | undefined,
  ensName?: string | null,
  chars = 4,
): string => {
  if (ensName) return ensName;
  if (address)
    return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
  return "";
};

export const formatNumber = (number: number): string =>
  number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

export const formatToUSD = ({ usdPrice, number }: { usdPrice: number; number?: BigNumber }) => {
  const usdValue = usdPrice * Number(formatToken(number));
  return formatNumber(usdValue);
};

export const formatToken = (
  number?: BigNumber | string,
  decimals: string | number = 18,
): string | undefined => {
  if (!number) {
    return;
  }
  const num = BigNumber.from(number);
  const formatted = formatUnits(num, Number(decimals));
  const split = formatted.split(".");
  if (split.length > 1) {
    // eslint-disable-next-line consistent-return
    return `${split[0]}.${split[1].substr(0, 6)}`;
  }
  // eslint-disable-next-line consistent-return
  return formatted;
};

const assignMonthToBlock = (blockNumber: number, monthlyStartBlocks: MonthlyStartBlock[]) => {
  const assignedMonhtlyBlock = monthlyStartBlocks.find(
    (monthlyStartBlock: MonthlyStartBlock, index) =>
      monthlyStartBlock.block <= blockNumber &&
      blockNumber <= monthlyStartBlocks[index + 1].block &&
      index < monthlyStartBlocks.length,
  );

  if (!assignedMonhtlyBlock) return monthlyStartBlocks[monthlyStartBlocks.length - 1].date;

  return assignedMonhtlyBlock.date;
};
