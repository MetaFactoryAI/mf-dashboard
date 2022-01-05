import { useState, useEffect } from "react";
import { IPFS_CLAIMS_SNAPSHOT_URL, MERKLE_REDEEM_CONTRACT } from "@/utils/constants";
import { get } from "@/utils/ipfsClient";
import { MerkleRedeem__factory } from "types/ethers-contracts";
import { useWeb3Context } from "@/contexts/Web3Context";
import { ethers } from "ethers";

interface Report {
  [address: string]: number;
}

const useClaims = () => {
  const [claimWeeks, setClaimWeeks] = useState<Record<number, Report>>({});
  const [latestClaimWeek, setLatestClaimWeek] = useState<Report>({});
  const { loading, account, errors, provider } = useWeb3Context();
  const getIpfsSnapshot = () => {
    const url = `https://${IPFS_CLAIMS_SNAPSHOT_URL}`;

    return fetch(url).then((res) => res.json());
  };

  useEffect(() => {
    const fetchClaims = async () => {
      const snapshot = await getIpfsSnapshot();
      let currentLatestClaimWeek = {};
      const currentClaimWeeks: Record<number, Report> = {};
      const latestWeekInSnapshot = Math.max(
        ...Object.keys(snapshot).map((numStr) => parseInt(numStr, 10)),
      );
      if (Object.keys(snapshot).length > 0) {
        const latestWeekIpfsHash = snapshot[latestWeekInSnapshot.toString()];
        currentLatestClaimWeek = await get(latestWeekIpfsHash);
        currentClaimWeeks[latestWeekInSnapshot] = currentLatestClaimWeek;
      }
      if (provider && account) {
        const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
        const claimStatus = await redeem.claimStatus(account, 1, latestWeekInSnapshot);
        console.log(claimStatus)
      }

      setClaimWeeks(currentClaimWeeks);
      setLatestClaimWeek(currentLatestClaimWeek);
    };

    fetchClaims();
  }, []);

  return { claimWeeks, latestClaimWeek };
};

export default useClaims;
