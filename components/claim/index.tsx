/* eslint-disable camelcase */
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { MerkleRedeem__factory } from "types/ethers-contracts";
import { MERKLE_REDEEM_CONTRACT } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Table } from "@/components/atoms";
import { formatClaimsEventData } from "@/utils/presentationHelper";

const Claim: NextPage = () => {
  const { loading, provider, dater } = useWeb3Context();
  const [claims, setClaims] = useState<{ address: string; amount: string }[]>([]);

  useEffect(() => {
    const fetchClaimHistory = async () => {
      if (provider) {
        const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
        // @ts-ignore
        const { block: startBlock } = await dater.getDate("2021-01-01T00:00:00Z", true);
        // @ts-ignore
        const { block: endBlock } = await dater.getDate("2022-01-01T00:00:00Z", false);
        const claimedFilter = redeem.filters.Claimed();
        const fetchedClaims = await redeem.queryFilter(claimedFilter, startBlock, endBlock);
        const normalizedClaims = await formatClaimsEventData(fetchedClaims);

        setClaims(normalizedClaims);
      }
    };

    fetchClaimHistory();
  }, [loading, provider, dater]);

  const tableColumns = React.useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
        style: {
          fontSize: "18px",
          fontWeight: "400",
          width: "40%",
        },
      },
      {
        Header: "Amount ($ROBOT)",
        accessor: "amount",
        style: {
          fontFamily: "body_bold",
          fontSize: "18px",
          fontWeight: "800",
          width: "20%",
        },
      },
      {
        Header: "Date",
        accessor: "date",
        style: {
          fontFamily: "body_regular",
          fontSize: "16px",
          fontWeight: "400",
          width: "40%",
          textAlign: "right",
        },
      },
    ],
    [],
  );

  return (
    <Box mt="80px" mr="80px" mb="80px">
      <Table
        // @ts-ignore
        columns={tableColumns}
        title="Distributions History"
        data={claims || []}
        initialState={{
          pageSize: 10,
        }}
      />
    </Box>
  );
};

export default Claim;
