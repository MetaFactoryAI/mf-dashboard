/* eslint-disable prettier/prettier */
import { Table, Tbody, Td, Tr, VStack, Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import Files from "./Files"
import Metadata from "./Metadata"
import Model from './Model'


const Index: NextPage = () => {
  const ref = useRef();

  return (
    <VStack spacing="0px">
      <Box
        pl="10px"
        pr="10px"
        alignSelf={{ base: "start", sm: "start", md: "start", lg: "center" }}
        pb="10px"
      >
        <Text fontFamily="caption" fontSize="12px" textAlign="start" fontWeight="400px">
          METADREAMER&apos;s CLOSET ➤ V2 MUTANT TEE
        </Text>
      </Box>
      <Box border="0px" p="1px" height="300px">
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
          <Suspense fallback={null}>
            {/* @ts-ignore */}
            <Stage controls={ref} preset="rembrandt" intensity={1}  environment="city">
              <Model />
            </Stage>
          </Suspense>
          {/* @ts-ignore */}
          <OrbitControls ref={ref} autoRotate />
        </Canvas>
      </Box>
      <Box pl="10px" pr="10px" alignSelf="center" pb="10px">
        <Text fontFamily="caption" fontSize="12px" fontWeight="400px">
          you own 2 of this item
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
              <Text fontFamily="heading" fontWeight="700" fontSize="18px" alignSelf="start" pt="14px" pb="14px">
                METADATA
              </Text>
            </Td>
            <Td border="1px solid black" padding="5px">
              <Metadata />
            </Td>
          </Tr>
          <Tr>
            <Td border="1px solid black" padding="5px" sx={{ writingMode: "vertical-rl" }}>
              <Text fontFamily="heading" fontWeight="700" fontSize="18px" alignSelf="start" pt="14px" pb="14px">
                FILES
              </Text>
            </Td>
            <Td border="1px solid black" padding="5px">
              <Files />
            </Td>
          </Tr>
          </Tbody>
      </Table>
    </VStack>
    );
};

export default Index;
