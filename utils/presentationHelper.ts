/* eslint-disable no-underscore-dangle */
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { ClaimedEvent } from "types/ethers-contracts/MerkleRedeem";
import { ethers } from "ethers";

export const formatClaimsEventData = async (claims: ClaimedEvent[]) =>
  Promise.all(
    claims.map((claim) =>
      claim.getBlock().then((block) => {
        const dateFormatOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        };
        const blockDateTime = new Date(block.timestamp * 1000);
        // @ts-ignore
        const blockDateTimeFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);

        return {
          avatarSrc: "/avatar-default.svg",
          address: formatAddress(claim.args._claimant),
          date: blockDateTimeFormat.format(blockDateTime),
          amount: Number(ethers.utils.formatEther(claim.args._balance)).toFixed(3),
        };
      }),
    ),
  );

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
