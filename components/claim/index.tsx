import { Heading } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { GraphChart, PieChart } from "@/components/atoms";

const Claim: NextPage = () => {
  const sampleDate = new Date();

  return (
    <div>
      <Heading as="h1" textAlign="center">
        <GraphChart chartData={graphChartData} width={660} />
        <PieChart chartData={pieChartData} width={400} />
      </Heading>
    </div>
  );
};

export default Claim;
