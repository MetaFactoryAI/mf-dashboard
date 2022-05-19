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
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              BRAND:
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              APESTHETICS
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              MANUFACTURER:
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              DECODE MFG
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              RELEASE DATE:
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              03.12.22
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              MADE IN:
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              BROOKLYN, NY
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              TOTAL SUPPLY:
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              150
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              PRODUCTION TECH(S):
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              DAOFREN, MILFDAD
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td border="0px" width="50%" padding="5px">
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              DESIGNER:
            </Text>
            <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
              ANONYMOUS
            </Text>
          </Td>
          <Td border="0px" width="50%" padding="5px">
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
  );

export default Metadata;
