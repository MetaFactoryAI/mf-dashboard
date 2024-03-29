/* eslint-disable prettier/prettier */
import { Table, Tbody, Td, Tr, VStack, Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import useUserName from "@/hooks/useUserName";
import useNftMetadata from "@/hooks/useNftMetadata";
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { useProvider, useAccount } from 'wagmi';
import { Loading } from "@/components/atoms";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Files from "./Files"
import Metadata from "./Metadata"
import Model from './Model'

const Index: NextPage = () => {
  const ref = useRef();
  const userName = useUserName();
  const { nftData, fetchNft, loading } = useNftMetadata();
  const router = useRouter();
  const { id } = router.query
  const provider = useProvider();
  const { data: account } = useAccount();
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    const fetch = async () => {
      if(provider && account?.address && id) {
        const { ethereum } = getMainnetSdk(provider);
        const nftBalances = await ethereum.nft_wearables.balanceOfBatch([account.address], [Number(id)]);
        setBalance(ethers.utils.formatUnits(nftBalances[0], 0))
      };
    }

    fetch();
  }, [provider, account, id]);

  useEffect(() => {
    if(id) {
      fetchNft(id);
    }
  }, [fetchNft, id]);

  if (loading) return <Loading />;

  return (
    <VStack spacing="0px">
      {userName && (
        <Box
          pl="10px"
          pr="10px"
          alignSelf={{ base: "start", sm: "start", md: "start", lg: "center" }}
          pb="10px"
        >
          <Text fontFamily="caption" fontSize="12px" textAlign="start" fontWeight="400px">
          {userName}&apos;s CLOSET ➤ {nftData?.name}
          </Text>
        </Box>
      )}
      <Box
        border="0px"
        p="1px"
        width="100%"
        height={{ base: "400px", sm: "400px", md: "500px", lg: "500px" }}
      >
        {nftData && (
          <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
            <Suspense fallback={null}>
              {/* @ts-ignore */}
              <Stage controls={ref} preset="rembrandt" intensity={1}  environment="city">
                <Model glbFile={nftData.glbFile}/>
              </Stage>
            </Suspense>
            {/* @ts-ignore */}
            <OrbitControls ref={ref} autoRotate />
          </Canvas>
        )}
      </Box>
      <Box pl="10px" pr="10px" alignSelf="center" pb="10px">
        <Text fontFamily="caption" fontSize="12px" fontWeight="400px">
          you own {balance} of this item
        </Text>
      </Box>
      <Table
        cellSpacing="0"
        cellPadding="0"
        border="1px solid black"
        width="100%"
        maxWidth="1000px"
        variant="unstyled"
      >
        <Tbody>
          <Tr>
            <Td border="1px solid black" padding="5px" sx={{ writingMode: "vertical-rl" }}>
              <Text fontFamily="heading" letterSpacing="-0.02em" lineHeight="22px" fontWeight="700" fontSize="18px" alignSelf="start" pt="14px" pb="14px">
                METADATA
              </Text>
            </Td>
            <Td border="1px solid black" padding="5px">
              { nftData && <Metadata nftData={ nftData } /> }
            </Td>
          </Tr>
          <Tr>
            <Td border="1px solid black" padding="5px" sx={{ writingMode: "vertical-rl" }}>
              <Text fontFamily="heading" letterSpacing="-0.02em" lineHeight="22px" fontWeight="700" fontSize="18px" alignSelf="start" pt="14px" pb="14px">
                FILES
              </Text>
            </Td>
            <Td border="1px solid black" padding="5px">
            { nftData && <Files nftData={nftData}/> }
            </Td>
          </Tr>
          </Tbody>
      </Table>
    </VStack>
    );
};

export default Index;
