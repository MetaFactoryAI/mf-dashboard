import { Center, Button } from "@chakra-ui/react";
// eslint-disable-next-line camelcase
import { MerkleRedeem__factory } from "types/ethers-contracts";
import { ethers } from "ethers";
import { useWeb3Context } from "@/contexts/Web3Context";
import { loadTree } from "@/utils/merkle/merkleTree";
import { MERKLE_REDEEM_CONTRACT } from "@/utils/constants";
import { Heading } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { GraphChart, PieChart } from "@/components/atoms";
import UnclaimedTokens from "../atoms/UnclaimedTokens";

const Connected: NextPage = () => {
  const { account, provider } = useWeb3Context();
  const handleClaim = async () => {
    if (provider && account) {
      const testBalances = {
        "0x8aBa14b229b1C4647FBF897b99b3a36E9BDF5422": "1.0",
        "0x77c845E6A61F37cB7B237de90a74fbc3679FcF06": "2.0",
      };

      const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
      const merkleTree = loadTree(testBalances);
      const merkleProof = merkleTree.getHexProof(
        ethers.utils.solidityKeccak256(
          ["address", "uint256"],
          [account, ethers.utils.parseEther("1")],
        ),
      );
      await redeem.claimWeek(account, 4, ethers.utils.parseEther("1"), merkleProof);
    }
  };

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
    <div>
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="MetaFactory Dashboard" />
      </Head>
      <Heading as="h1" textAlign="center">
        <GraphChart chartData={graphChartData} width={660} />
        <PieChart chartData={pieChartData} width={400} />
        <UnclaimedTokens />
      </Heading>
      <Center>
        <Button
          onClick={handleClaim}
          backgroundColor="transparent"
          border="1px"
          rounded="false"
          _hover={{ bg: "transparent" }}
        >
          Claim balance
        </Button>
      </Center>
    </div>
  );
};

export default Connected;
