// eslint-disable-next-line camelcase
import { Box } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { PieChart } from "@/components/atoms";
import useClaims from "@/hooks/useClaims";
import useFetchGraph from "@/utils/graph/useFetchGraph";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Loading } from "@/components/atoms";
import UnclaimedTokens from "../atoms/UnclaimedTokens";

const Connected: NextPage = () => {
  const { designerRewards, buyerRewards, loading, fetchDesignerRewards, fetchBuyerRewards } =
    useFetchGraph();
  const { loading: loadingWeb3, accountAuthBearer, account } = useWeb3Context();
  const { unclaimedTotal, handleClaim } = useClaims();

  const pieChartData = [
    // @ts-ignore
    { key: "Designer Rewards", value: designerRewards.total, color: "#4FF970" },
    // @ts-ignore
    { key: "Buyer Rewards", value: buyerRewards.total, color: "#FF2ECE" },
  ];

  useEffect(() => {
    if (accountAuthBearer && account) {
      fetchDesignerRewards("0x9eec0b5bd8a48047f0dcc61e98b4b92951480f98", accountAuthBearer);
      fetchBuyerRewards("0x9eec0b5bd8a48047f0dcc61e98b4b92951480f98", accountAuthBearer);
    }
  }, [fetchDesignerRewards, accountAuthBearer, account, fetchBuyerRewards]);

  return (
    <div>
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="MetaFactory Dashboard" />
      </Head>
      {(loading || loadingWeb3) && <Loading />}
      {!loading && !loadingWeb3 && (
        <Box>
          <PieChart chartData={pieChartData} width={400} />
          <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
        </Box>
      )}
    </div>
  );
};

export default Connected;
