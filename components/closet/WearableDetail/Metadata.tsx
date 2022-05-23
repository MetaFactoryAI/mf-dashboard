/* eslint-disable prettier/prettier */
import { Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const Metadata: NextPage = () => (
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
              APESTHETICS
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              MANUFACTURER:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              DECODE MFG
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
          <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              RELEASE DATE:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              03.12.22
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              MADE IN:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              BROOKLYN, NY
            </Text>
          </Td>
        </Tr>
        <Tr>
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
              PRODUCTION TECH(S):
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              DAOFREN, MILFDAD
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              DESIGNER:
            </Text>
            <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px">
              ANONYMOUS
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
        </Tr>
      </Tbody>
    </Table>
  );

export default Metadata;
