import { Center, Heading } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { GraphChart, PieChart } from "@/components/atoms";

const Home: NextPage = () => {
  const sampleDate = new Date();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pieChartData = [
    { key: "TEST", value: 10, color: "#4FF970" },
    { key: "TEST2", value: 20, color: "#FF2ECE" },
    { key: "TEST3", value: 30, color: "#89F6FF" },
  ];

  return (
    <Center h="calc(100vh - 96px)">
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="MetaFactory Dashboard" />
      </Head>
      <Heading as="h1" textAlign="center">
        <GraphChart chartData={graphChartData} width={860} />
        <PieChart chartData={pieChartData} width={400} />
      </Heading>
    </Center>
  );
};

export default Home;
