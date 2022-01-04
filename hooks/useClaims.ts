import { useState, useEffect } from "react";
import { IPFS_CLAIMS_SNAPSHOT_URL } from "@/utils/constants";
import { get } from "@/utils/ipfsClient";

interface Report {
  [address: string]: number;
}

const useClaims = () => {
  const [claimWeeks, setClaimWeeks] = useState<Record<number, Report>>({});
  const [latestClaimWeek, setLatestClaimWeek] = useState<Report>({});
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

      setClaimWeeks(currentClaimWeeks);
      setLatestClaimWeek(currentLatestClaimWeek);
    };

    fetchClaims();
  }, []);

  return { claimWeeks, latestClaimWeek };
};

export default useClaims;
