/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Text, HStack, Button, Box, Center } from "@chakra-ui/react";
import { Table as ChakraTable, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import Image from "next/image";

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

  return (
    <Box {...props}>
      <ChakraTable {...getTableProps()} variant="unstyled" cellSpacing="0" cellPadding="0">
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
        <Tbody {...getTableBodyProps()} border="none">
          {/* @ts-ignore */}
          {page.map((row, _i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Tr {...row.getRowProps()} key={`table_row_${_i}`} border="2px" height="76px">
                {/* @ts-ignore */}
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Td {...cell.column.style} key={`table_row_${_i}_${cell.value}`}>
                    {cell.column.id === "address" && (
                      <HStack>
                        <Image
                          src={cell.row.original.avatarSrc}
                          alt=""
                          width="40px"
                          height="40px"
                        />
                        <Text>{cell.render("Cell")}</Text>
                      </HStack>
                    )}
                    {cell.column.id !== "address" && cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
        <Box mx="100%" mt="20px">
          <HStack>
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
            <Text>of&nbsp;{pageOptions.length}</Text>
            <Button
              _focus={{ boxShadow: "none" }}
              onClick={() => nextPage()}
              disabled={!canNextPage}
              variant="unstyled"
            >
              <Image src="/table-paging-right.svg" alt="" width="40px" height="40px" />
            </Button>
          </HStack>
        </Box>
      </ChakraTable>
    </Box>
  );
};

export default Table;
