import { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line camelcase
import { Merkle_redeem__factory } from "types/ethers-contracts/factories";
import type { MerkleRedeem } from "types/ethers-contracts/Merkle_redeem";
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
import { useAccount, useSigner, useProvider } from "wagmi";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const EthDater = require("ethereum-block-by-date");

const useClaims = () => {
  const [claimWeeksProofs, setClaimWeeksProofs] = useState<MerkleRedeem.ClaimStruct[]>([]);
  const [unclaimedTotal, setUnclaimedTotal] = useState("0");
  const [claimedTotal, setClaimedTotal] = useState("0");
  const { data: account, isLoading: loading } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const [claimEventsLoading, setClaimEventsLoading] = useState<boolean>(false);
  const [claims, setClaims] = useState<{ address: string; amount: string }[]>([]);
  const [monthlyClaims, setMonthlyClaims] = useState<ChartData[]>([]);

  const getDater = useCallback(() => {
    const dater = new EthDater(provider);
    return dater;
  }, [provider]);

  // fetches claim info (from IPFS) and calculates total claimed/unclaimed
  // ROBOT, as well calculates all necessary merkle proofs to claim it from the contrat
  useEffect(() => {
    const getClaimsMetadata = async () => {
      const claimWeeks: Record<number, ClaimWeek> = await getClaimWeeks();

      if (Object.keys(claimWeeks).length < 1) return;
      if (loading || !provider || !account?.address) return;

      const redeem = Merkle_redeem__factory.connect(
        process.env.NEXT_PUBLIC_MERKLE_REDEEM_CONTRACT || "",
        provider,
      );
      const unclaimedWeeks = await getUnclaimedWeeksForAddress(redeem, claimWeeks, account.address);
      const unclaimedWeeksValues = getUnclaimedWeeksValues(
        claimWeeks,
        unclaimedWeeks,
        account.address,
      );
      const claimedWeeksValues = getClaimedWeeksValues(claimWeeks, unclaimedWeeks, account.address);
      const calculatedClaimWeeksProofs: MerkleRedeem.ClaimStruct[] = getClaimsWeeksProofs(
        claimWeeks,
        unclaimedWeeksValues,
        account?.address,
      );
      const formattedClaimedTotal = formatNumber(getWeekValuesTotal(claimedWeeksValues));
      const formattedUnclaimedTotal = formatNumber(getWeekValuesTotal(unclaimedWeeksValues));

      setClaimWeeksProofs(calculatedClaimWeeksProofs);
      setUnclaimedTotal(formattedUnclaimedTotal);
      setClaimedTotal(formattedClaimedTotal);
    };

    getClaimsMetadata();
  }, [account, loading, provider, signer]);

  // fetches (from the blockchain) historical claims
  const fetchHistoricalClaims = useCallback(
    (claimsYear) => {
      const fetchClaimHistory = async () => {
        if (provider && claimsYear) {
          const redeem = Merkle_redeem__factory.connect(
            process.env.NEXT_PUBLIC_MERKLE_REDEEM_CONTRACT || "",
            provider,
          );
          // @ts-ignore
          const { block: startBlock } = await getDater().getDate(
            `${claimsYear}-01-01T00:00:00Z`,
            true,
          );
          // @ts-ignore
          const { block: endBlock } = await getDater().getDate(
            `${claimsYear + 1}-01-01T00:00:00Z`,
            false,
          );
          const claimedFilter = redeem.filters.Claimed();
          const fetchedClaims = await redeem.queryFilter(claimedFilter, startBlock, endBlock);
          const normalizedClaims = await formatClaimsEventData(fetchedClaims);
          const normalizedMonthlyClaims = formatMonthlyClaimsEventData(normalizedClaims);

          setClaimEventsLoading(false);
          // @ts-ignore
          setClaims(normalizedClaims);
          setMonthlyClaims(normalizedMonthlyClaims);
        }
      };

      setClaimEventsLoading(true);
      fetchClaimHistory();
    },
    [getDater, provider],
  );

  const handleClaim = useCallback(() => {
    const claim = async () => {
      if (claimWeeksProofs.length < 1) return;
      if (loading || !signer || !account?.address) return;

      const redeem = Merkle_redeem__factory.connect(
        process.env.NEXT_PUBLIC_MERKLE_REDEEM_CONTRACT || "",
        signer,
      );
      // const result = await redeem.verifyClaim(
      //   account,
      //   claimWeeksProofs[0].week,
      //   claimWeeksProofs[0].balance,
      //   claimWeeksProofs[0].merkleProof,
      // );
      // console.log(result);

      await redeem.claimWeeks(account.address, claimWeeksProofs);
    };

    claim();
  }, [account, claimWeeksProofs, loading, signer]);

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
