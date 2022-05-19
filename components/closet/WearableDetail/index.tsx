/* eslint-disable prettier/prettier */
import { Table, Tbody, Td, Tr, VStack, Box, Flex, Text, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Metadata from "./Metadata"
import Files from "./Files"

const Index: NextPage = () => {
  const router = useRouter();
  const { id } = router.query

  return (
    <VStack spacing="0px">
      <Box pl="10px" pr="10px" alignSelf="start" pb="10px">
        <Text fontFamily="body" fontSize="12px" textAlign="start">
          METADREAMER&apos;s CLOSET ➤ V2 MUTANT TEE
        </Text>
      </Box>
      <Box border="0px" p="1px">
        <Image
          src={`/test_assets/list_items/${id}.png`}
          alt=""
          width="322px"
          height="322px"
        />
      </Box>
      <Box pl="10px" pr="10px" alignSelf="center" pb="10px">
        <Text fontFamily="body" fontSize="10px">
          you own <b>2</b> of this item
        </Text>
      </Box>


      <Table
        cellSpacing="0"
        cellPadding="0"
        border="1px solid black"
        width="100%"
        variant="unstyled"
      >
        <Tbody>
          <Tr>
            <Td border="1px solid black" padding="5px" sx={{ writingMode: "vertical-rl" }}>
              <Text fontFamily="body_bold" fontWeight="400" fontSize="18px" alignSelf="start" pt="14px" pb="14px">
                METADATA
              </Text>
            </Td>
            <Td border="1px solid black" padding="5px">
              <Metadata />
            </Td>
          </Tr>
          <Tr>
            <Td border="1px solid black" padding="5px" sx={{ writingMode: "vertical-rl" }}>
              <Text fontFamily="body_bold" fontWeight="400" fontSize="18px" alignSelf="start" pt="14px" pb="14px">
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
