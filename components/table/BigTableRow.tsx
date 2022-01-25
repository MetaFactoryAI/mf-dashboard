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
    const handleRedirect = (redirectLink: string) => {
      window.location.assign(redirectLink);
    };

    return (
      <Td {...cell.column.style} key={cellKey}>
        {/* handle specific cases */}
        {cell.column.id === "address" && (
          <HStack>
            {/* @ts-ignore */}
            {cell.row.original.avatarSrc && (
              <Image src={cell.row.original.avatarSrc} alt="" width="40px" height="40px" />
            )}
            <Text>{cell.render("Cell")}</Text>
          </HStack>
        )}
        {cell.column.id === "redirect" && (
          <Box onClick={() => handleRedirect(cell.row.original.redirectLink)} cursor="pointer">
            {cell.row.original.redirectValue}&nbsp;&nbsp;
            <Image src="/arrow.svg" alt="" width="15px" height="15px" />
          </Box>
        )}
        {/* render all other cases */}
        <Box>
          {cell.column.id !== "address" && cell.column.id !== "link" && cell.render("Cell")}
        </Box>
      </Td>
    );
  });

export default BigTableRow;
