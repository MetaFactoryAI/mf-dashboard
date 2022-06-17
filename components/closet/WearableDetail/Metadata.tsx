/* eslint-disable prettier/prettier */
import React from "react";
import { NftData } from "@/hooks/useNftMetadata";
import { Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

const Metadata: React.FC<{nftData: NftData}> = ({ nftData }) => (
    <Table
      cellSpacing="0"
      cellPadding="0"
      border="0px"
      width="100%"
      variant="unstyled"
    >
      <Tbody>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              BRAND:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              {nftData.properties.brand}
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              STYLE:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              {nftData.properties.style}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
          <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              RELEASE DATE:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              {nftData.properties.releaseDate ? dayjs(nftData.properties.releaseDate.value, "YYYY-MM-DD").format("MM/DD/YYYY") : 'N/A'}
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              MADE IN:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              {nftData.properties.madeIn ? nftData.properties.madeIn.value : 'N/A'}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              DESIGNER:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              {nftData.properties.designer}
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              PRODUCTION TECH(S):
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              {nftData.properties.technician}
            </Text>
          </Td>
        </Tr>
        {/* <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              TOTAL SUPPLY:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              150
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              RENDERED BY:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              FRAEMWORK
            </Text>
          </Td>
        </Tr> */}
      </Tbody>
    </Table>
  );

export default Metadata;
