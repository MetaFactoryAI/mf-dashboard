/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Text, Button, Box, Center, Flex } from "@chakra-ui/react";
import { Table as ChakraTable, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import Image from "next/image";
import BigTableRow from "./BigTableRow";
import SmallTableRow from "./SmallTableRow";
import useChakraBreakpoints from "@/utils/useChakraBreakpoints";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useTable, usePagination } = require("react-table");

// Create a default prop getter
const defaultPropGetter = () => ({});

// @ts-ignore
const Table: React.FC = ({ data, columns, initialState, ...props }) => {
  const {
    getTableProps = defaultPropGetter,
    getTableBodyProps = defaultPropGetter,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    usePagination,
  );

  const { isDesktopScreen } = useChakraBreakpoints();

  return (
    <Box {...props}>
      <ChakraTable {...getTableProps()} variant="unstyled" cellSpacing="0" cellPadding="0">
        {isDesktopScreen && (
          <Thead>
            {/* @ts-ignore */}
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {/* @ts-ignore */}
                {headerGroup.headers.map((column) => (
                  <Th
                    textTransform="capitalize"
                    fontSize="12"
                    fontFamily="body_regular"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
        )}
        <Tbody {...getTableBodyProps()} border="none">
          {/* @ts-ignore */}
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()} key={`table_row_${i}`} border="2px" height="76px">
                {/* @ts-ignore */}
                {isDesktopScreen && <BigTableRow row={row} index={i} />}
                {/* @ts-ignore */}
                {!isDesktopScreen && <SmallTableRow row={row} index={i} />}
                {/* @ts-ignore */}
              </Tr>
            );
          })}
        </Tbody>
        <Box mt="20px" mx={{ md: "100%", lg: "100%" }} width="100%">
          <Flex
            justifyContent={{ base: "center ", sm: "center", md: "start", lg: "start" }}
            alignItems="center"
          >
            <Button
              _focus={{ boxShadow: "none" }}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              variant="unstyled"
            >
              <Image src="/table-paging-left.svg" alt="" width="40px" height="40px" />
            </Button>
            <Center border="1px" height="40px" minWidth="40px">
              <Text>{pageIndex + 1}</Text>
            </Center>
            <Text p="10px">of&nbsp;{pageOptions.length}</Text>
            <Button
              _focus={{ boxShadow: "none" }}
              onClick={() => nextPage()}
              disabled={!canNextPage}
              variant="unstyled"
            >
              <Image src="/table-paging-right.svg" alt="" width="40px" height="40px" />
            </Button>
          </Flex>
        </Box>
      </ChakraTable>
    </Box>
  );
};

export default Table;
