import { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line camelcase
import { MerkleRedeem__factory } from "types/ethers-contracts";
import type { ClaimStruct } from "types/ethers-contracts/MerkleRedeem";
import { MERKLE_REDEEM_CONTRACT } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";
import {
  getClaimWeeks,
  getUnclaimedWeeksForAddress,
  getUnclaimedWeeksValues,
  getClaimedWeeksValues,
  getWeekValuesTotal,
  getClaimsWeeksProofs,
} from "@/utils/claims";
import type { ClaimWeek } from "@/utils/claims";
import {
  formatNumber,
  formatClaimsEventData,
  formatMonthlyClaimsEventData,
} from "@/utils/presentationHelper";
import type { ChartData } from "@/components/atoms/YearlyBarChart";

const useClaims = () => {
  const [claimWeeksProofs, setClaimWeeksProofs] = useState<ClaimStruct[]>([]);
  const [unclaimedTotal, setUnclaimedTotal] = useState("0");
  const [claimedTotal, setClaimedTotal] = useState("0");
  const { loading, account, provider, dater } = useWeb3Context();
  const [claimEventsLoading, setClaimEventsLoading] = useState<boolean>(false);
  const [claims, setClaims] = useState<{ address: string; amount: string }[]>([]);
  const [monthlyClaims, setMonthlyClaims] = useState<ChartData[]>([]);

  // fetches claim info (from IPFS) and calculates total claimed/unclaimed
  // ROBOT, as well calculates all necessary merkle proofs to claim it from the contrat
  useEffect(() => {
    const getClaimsMetadata = async () => {
      const claimWeeks: Record<number, ClaimWeek> = await getClaimWeeks();

      if (Object.keys(claimWeeks).length < 1) return;
      if (loading || !provider || !account) return;

      const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
      const unclaimedWeeks = await getUnclaimedWeeksForAddress(redeem, claimWeeks, account);
      const unclaimedWeeksValues = getUnclaimedWeeksValues(claimWeeks, unclaimedWeeks, account);
      const claimedWeeksValues = getClaimedWeeksValues(claimWeeks, unclaimedWeeks, account);
      const calculatedClaimWeeksProofs: ClaimStruct[] = getClaimsWeeksProofs(
        claimWeeks,
        unclaimedWeeksValues,
        account,
      );
      const formattedClaimedTotal = formatNumber(getWeekValuesTotal(claimedWeeksValues));
      const formattedUnclaimedTotal = formatNumber(getWeekValuesTotal(unclaimedWeeksValues));

      setClaimWeeksProofs(calculatedClaimWeeksProofs);
      setUnclaimedTotal(formattedUnclaimedTotal);
      setClaimedTotal(formattedClaimedTotal);
    };

    getClaimsMetadata();
  }, [account, loading, provider]);

  // fetches (from the blockchain) historical claims
  const fetchHistoricalClaims = useCallback(
    (claimsYear) => {
      const fetchClaimHistory = async () => {
        if (provider && claimsYear) {
          const redeem = MerkleRedeem__factory.connect(
            MERKLE_REDEEM_CONTRACT,
            provider.getSigner(),
          );
          // @ts-ignore
          const { block: startBlock } = await dater.getDate(`${claimsYear}-01-01T00:00:00Z`, true);
          // @ts-ignore
          const { block: endBlock } = await dater.getDate(
            `${claimsYear + 1}-01-01T00:00:00Z`,
            false,
          );
          const claimedFilter = redeem.filters.Claimed();
          const fetchedClaims = await redeem.queryFilter(claimedFilter, startBlock, endBlock);
          const normalizedClaims = await formatClaimsEventData(fetchedClaims);
          const normalizedMonthlyClaims = formatMonthlyClaimsEventData(normalizedClaims);

          setClaimEventsLoading(false);
          setClaims(normalizedClaims);
          setMonthlyClaims(normalizedMonthlyClaims);
        }
      };

      setClaimEventsLoading(true);
      fetchClaimHistory();
    },
    [dater, provider],
  );

  const handleClaim = useCallback(() => {
    const claim = async () => {
      if (claimWeeksProofs.length < 1) return;
      if (loading || !provider || !account) return;

      const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
      // const result = await redeem.verifyClaim(
      //   account,
      //   claimWeeksProofs[0].week,
      //   claimWeeksProofs[0].balance,
      //   claimWeeksProofs[0].merkleProof,
      // );
      // console.log(result);

      await redeem.claimWeeks(account, claimWeeksProofs);
    };

    claim();
  }, [account, claimWeeksProofs, loading, provider]);

  return {
    unclaimedTotal,
    claimedTotal,
    handleClaim,
    fetchHistoricalClaims,
    loading: loading || claimEventsLoading,
    claims,
    monthlyClaims,
  };
};

export default useClaims;
