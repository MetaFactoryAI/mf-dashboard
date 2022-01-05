import { useState, useEffect } from "react";
// eslint-disable-next-line camelcase
import { MerkleRedeem__factory } from "types/ethers-contracts";
import { MERKLE_REDEEM_CONTRACT } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";
import {
  getClaimWeeks,
  getUnclaimedWeeksForAddress,
  getUnclaimedWeeksValues,
  getUnclaimedTotal,
  getClaimsWeeksProofs,
} from "@/utils/claims";
import type { ClaimWeek } from "@/utils/claims";

const useClaims = () => {
  const [unclaimedTotal, setUnclaimedTotal] = useState(0);
  const { loading, account, provider } = useWeb3Context();
  useEffect(() => {
    const fetchClaims = async () => {
      const claimWeeks: Record<number, ClaimWeek> = await getClaimWeeks();

      if (Object.keys(claimWeeks).length < 1) return;
      if (loading || !provider || !account) return;

      const address = "0xEC3281124d4c2FCA8A88e3076C1E7749CfEcb7F2";
      const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
      const unclaimedWeeks = await getUnclaimedWeeksForAddress(redeem, claimWeeks, address);
      const unclaimedWeeksValues = getUnclaimedWeeksValues(claimWeeks, unclaimedWeeks, address);
      const claimWeeksProofs = getClaimsWeeksProofs(claimWeeks, unclaimedWeeksValues, address);
      const result = await redeem.verifyClaim(address, claimWeeksProofs[0][0], claimWeeksProofs[0][1], claimWeeksProofs[0][2]);

      setUnclaimedTotal(getUnclaimedTotal(unclaimedWeeksValues));
      console.log(result);
    };

    fetchClaims();
  }, [account, loading, provider]);

  return { unclaimedTotal };
};

export default useClaims;
