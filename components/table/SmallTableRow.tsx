/* eslint-disable react/jsx-props-no-spreading */
import { HStack, Box, Flex } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { Td } from "@chakra-ui/table";

// @ts-ignore
const SmallTableRow: React.FC = ({ row, index }) => (
  <Td colSpan={10}>
    <HStack my="24px">
      {row.original.avatarSrc && (
        <Box key={`${index}_table_avatar`} ml="16px" mr="8px">
          <Image src={row.original.avatarSrc} alt="" width="40px" height="40px" />
        </Box>
      )}
      <Box>
        {/* @ts-ignore */}
        {row.cells.map((cell) => {
          const cellKey = `table_row_${index}_${cell.value}`;
          const handleRedirect = (redirectLink: string) => {
            window.location.assign(redirectLink);
          };

          return (
            <Flex {...cell.column.style} key={cellKey} justifyContent="start">
              {/* handle specific case */}
              {cell.column.id === "redirect" && (
                <Box
                  onClick={() => handleRedirect(cell.row.original.redirectLink)}
                  cursor="pointer"
                >
                  {cell.row.original.redirectValue}&nbsp;&nbsp;
                  <Image src="/arrow.svg" alt="" width="15px" height="15px" />
                </Box>
              )}
              {/* render other cases */}
              {cell.column.id !== "redirect" && (
                <Flex alignContent="start">{cell.render("Cell")}</Flex>
              )}
            </Flex>
          );
        })}
      </Box>
    </HStack>
  </Td>
);

export default SmallTableRow;
