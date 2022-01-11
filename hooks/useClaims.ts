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
import { formatNumber } from "@/utils/presentationHelper";

const useClaims = () => {
  const [claimWeeksProofs, setClaimWeeksProofs] = useState<ClaimStruct[]>([]);
  const [unclaimedTotal, setUnclaimedTotal] = useState("0");
  const [claimedTotal, setClaimedTotal] = useState("0");
  const { loading, account, provider } = useWeb3Context();

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

  return { unclaimedTotal, claimedTotal, handleClaim };
};

export default useClaims;
