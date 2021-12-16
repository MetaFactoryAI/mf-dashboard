/* eslint-disable camelcase */
import { Box, Grid, GridItem, Text, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { MerkleRedeem__factory } from "types/ethers-contracts";
import { MERKLE_REDEEM_CONTRACT } from "@/utils/constants";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Table, Loading, YearlyBarChart } from "@/components/atoms";
import { formatClaimsEventData, formatMonthlyClaimsEventData } from "@/utils/presentationHelper";
import type { ChartData } from "@/components/atoms/YearlyBarChart";
import { generateYearsUntilToday } from "@/utils/time";

const Claim: NextPage = () => {
  const START_YEAR = 2020;
  const { provider, dater } = useWeb3Context();
  const [claims, setClaims] = useState<{ address: string; amount: string }[]>([]);
  const [monthlyClaims, setMonthlyClaims] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // duplicit state with the bar chart - bad practice but cant isloate chart from rest of buttons
  const [year, setYear] = useState<number>(START_YEAR);

  useEffect(() => {
    const fetchClaimHistory = async () => {
      if (provider) {
        const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
        // @ts-ignore
        const { block: startBlock } = await dater.getDate(`${year}-01-01T00:00:00Z`, true);
        // @ts-ignore
        const { block: endBlock } = await dater.getDate(`${year + 1}-01-01T00:00:00Z`, false);
        const claimedFilter = redeem.filters.Claimed();
        const fetchedClaims = await redeem.queryFilter(claimedFilter, startBlock, endBlock);
        const normalizedClaims = await formatClaimsEventData(fetchedClaims);
        const normalizedMonthlyClaims = formatMonthlyClaimsEventData(normalizedClaims);

        setLoading(false);
        setClaims(normalizedClaims);
        setMonthlyClaims(normalizedMonthlyClaims);
      }
    };

    setLoading(true);
    fetchClaimHistory();
  }, [dater, provider, year]);

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
        },
      },
      {
        Header: "Date",
        accessor: "date",
        style: {
          fontFamily: "body_regular",
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "right",
        },
      },
    ],
    [],
  );

  return (
    <Box>
      {loading && <Loading />}
      {!loading && (
        <Box>
          <YearlyBarChart
            chartData={monthlyClaims}
            title="Distributions"
            startYear={year}
            years={generateYearsUntilToday(START_YEAR)}
            yearSelectedCallback={setYear}
          />
          <Grid templateColumns="repeat(10, 1fr)" width="100%">
            <GridItem colSpan={7}>
              <Center>
                <Text
                  borderBottom="2px"
                  borderTop="2px"
                  borderRight="2px"
                  borderLeft="2px"
                  px="10px"
                  py="2px"
                  fontWeight="400"
                  fontSize="18px"
                >
                  Distributions History
                </Text>
              </Center>
              <Table
                // @ts-ignore
                columns={tableColumns}
                data={claims || []}
                initialState={{
                  pageSize: 10,
                }}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <Text>TEST</Text>
            </GridItem>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Claim;