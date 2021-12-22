/* eslint-disable react/jsx-props-no-spreading */
import { HStack, Box, Flex } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

// @ts-ignore
const SmallTableRow: React.FC = ({ row, index }) => (
  <HStack my="24px">
    <Box key={`${index}_table_avatar`} ml="16px" mr="8px">
      <Image src={row.original.avatarSrc} alt="" width="40px" height="40px" />
    </Box>
    <Box>
      {/* @ts-ignore */}
      {row.cells.map((cell) => {
        const cellKey = `table_row_${index}_${cell.value}`;

        return (
          <Flex {...cell.column.style} key={cellKey} justifyContent="start">
            <Flex alignContent="start">{cell.render("Cell")}</Flex>
          </Flex>
        );
      })}
    </Box>
  </HStack>
);

export default SmallTableRow;
