import { Box } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { GraphChart } from "../atoms";
import MFAbout from "../atoms/MFAbout";
import Swap from "../atoms/Swap";

const Exchange: NextPage = () => {
  const sampleDate = new Date();
  const graphChartData = [
    { key: "TEST", value: 0, date: new Date().setDate(sampleDate.getDate() + 1) },
    { key: "TEST", value: 10, date: new Date().setDate(sampleDate.getDate() + 2) },
    { key: "TEST2", value: 20, date: new Date().setDate(sampleDate.getDate() + 3) },
    { key: "TEST3", value: 30, date: new Date().setDate(sampleDate.getDate() + 4) },
    { key: "TEST", value: 40, date: new Date().setDate(sampleDate.getDate() + 5) },
    { key: "TEST2", value: 20, date: new Date().setDate(sampleDate.getDate() + 6) },
    { key: "TEST3", value: 60, date: new Date().setDate(sampleDate.getDate() + 7) },
    { key: "TEST", value: 10, date: new Date().setDate(sampleDate.getDate() + 8) },
    { key: "TEST2", value: 80, date: new Date().setDate(sampleDate.getDate() + 9) },
    { key: "TEST3", value: 70, date: new Date().setDate(sampleDate.getDate() + 10) },
    { key: "TEST", value: 60, date: new Date().setDate(sampleDate.getDate() + 11) },
    { key: "TEST2", value: 50, date: new Date().setDate(sampleDate.getDate() + 12) },
    { key: "TEST3", value: 30, date: new Date().setDate(sampleDate.getDate() + 13) },
    { key: "TEST", value: 100, date: new Date().setDate(sampleDate.getDate() + 14) },
    { key: "TEST2", value: 120, date: new Date().setDate(sampleDate.getDate() + 15) },
    { key: "TEST3", value: 130, date: new Date().setDate(sampleDate.getDate() + 16) },
  ];

  return (
    <Box>
      <HStack>
        <GraphChart chartData={graphChartData} width={660} />
        <Swap />
      </HStack>
      <MFAbout />
      {/* <Grid>to place mkt cap elements here and place in correct location</Grid> */}
    </Box>
  );
};

export default Exchange;
