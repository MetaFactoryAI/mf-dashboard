/* eslint-disable react/jsx-props-no-spreading */
import { Text, HStack, Box } from "@chakra-ui/react";
import { Td } from "@chakra-ui/table";
import React from "react";
import Image from "next/image";

// @ts-ignore
const BigTableRow: React.FC = ({ row, index }) =>
  // @ts-ignore
  row.cells.map((cell) => {
    const cellKey = `table_row_${index}_${cell.value}`;

    return (
      <Td {...cell.column.style} key={cellKey}>
        {cell.column.id === "address" && (
          <HStack>
            {/* @ts-ignore */}
            <Image src={cell.row.original.avatarSrc} alt="" width="40px" height="40px" />
            <Text>{cell.render("Cell")}</Text>
          </HStack>
        )}
        <Box>{cell.column.id !== "address" && cell.render("Cell")}</Box>
      </Td>
    );
  });

export default BigTableRow;
