/* eslint-disable prettier/prettier */
import { Table, Tbody, Td, Tr, VStack, Box, Flex, Text, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const Wearables: NextPage = () => {
  const router = useRouter();
  const { id } = router.query
  const handleDownload = () => {
    // TODO: needs backend func - https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  };

  return (
    <VStack spacing="0px">
      <Box pl="10px" pr="10px" alignSelf="start" pb="10px">
        <Text fontFamily="body" fontSize="12px" textAlign="start">
          METADREAMER&apos;s CLOSET ➤ V2 MUTANT TEE
        </Text>
      </Box>
      <Box border="1px" p="1px">
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

      <Text fontFamily="body_regular" fontWeight="400" fontSize="18px" alignSelf="start" pb="10px">
        METADATA
      </Text>
      <Table
        cellSpacing="0"
        cellPadding="0"
        border="1px solid black"
        width="100%"
        variant="unstyled"
      >
        <Tbody>
          <Tr>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                BRAND:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                APESTHETICS
              </Text>
            </Td>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                MANUFACTURER:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                DECODE MFG
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                RELEASE DATE:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                03.12.22
              </Text>
            </Td>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                MADE IN:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
               BROOKLYN, NY
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                TOTAL SUPPLY:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                150
              </Text>
            </Td>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                PRODUCTION TECH(S):
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
               DAOFREN, MILFDAD
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                DESIGNER:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                ANONYMOUS
              </Text>
            </Td>
            <Td border="1px solid black" width="50%" padding="5px">
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                RENDERED BY:
              </Text>
              <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
                FRAEMWORK
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Box pt="30px" width="100%">
        <Text fontFamily="body_regular" fontWeight="400" fontSize="18px" alignSelf="start" pb="10px">
          FILES
        </Text>
        <Flex flex="1" flexDirection="row" border="1px" padding="5px" pb="47px">
          <VStack p="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/tshirt_tpose.glb">1. MUTANTV2.GLTF</a>
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/tshirt_tpose.glb">2. MUTANTV2.GLB</a>
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/bankless-shirt.png">3. MUTANTV2.PNG</a>
            </Text>
          </VStack>
          <Spacer />
          <Box p="5px" pr="10px">
            <Image src="/arrow_down.svg" alt="" width="39px" height="39px" onClick={handleDownload}/>
          </Box>
        </Flex>
      </Box>
    </VStack>
    );
};

export default Wearables;
