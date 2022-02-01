import React from "react";
import { Box, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import SummaryField2 from "./shared/SummaryField2";
import { formatAddress } from "@/utils/presentationHelper";
import type { CoinRow } from "@/hooks/useCoinData";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";

const CoinDataSummary: React.FC<{
  coinData: CoinRow[][];
}> = ({ coinData }) => {
  const { isDesktopScreen } = useChakraBreakpoints();
  const createClickableComponent = (col: CoinRow) => (
    <Td
      style={{ border: "1px solid black", width: "50%" }}
      key={`coin-data-sum-clickable-td-${col.title}`}
      padding="0px"
    >
      <SummaryField2
        title={col.title}
        value={formatAddress(col.value.toString())}
        redirectLink={`https://etherscan.io/address/${col.value}`}
      />
    </Td>
  );

  return (
    <Box pt="40px">
      <Table
        cellSpacing="0"
        cellPadding="0"
        border="1px solid black"
        width="100%"
        variant="unstyled"
      >
        <Tbody>
          {coinData.slice(0, 2).map((cols) => {
            const createComponent = (col: CoinRow) => (
              <Td
                border="1px solid black"
                width="50%"
                key={`coin-data-sum-td-${col.title}`}
                padding="0px"
              >
                <SummaryField2 title={col.title} value={col.value.toString()} />
              </Td>
            );

            if (isDesktopScreen)
              return (
                <Tr key={`coin-data-sum-tr-${cols[0].title}`}>
                  {createComponent(cols[0])}
                  {createComponent(cols[1])}
                </Tr>
              );

            return cols.map((col: CoinRow) => (
              <Tr key={`coin-data-sum-tr2-${col.title}`}>{createComponent(col)}</Tr>
            ));
          })}

          {isDesktopScreen && (
            <Tr>
              {createClickableComponent(coinData[2][0])}
              {createClickableComponent(coinData[2][1])}
            </Tr>
          )}

          {!isDesktopScreen &&
            coinData[2].map((col: CoinRow) => (
              <Tr key={`coin-data-sum-tr-clickable-${col.title}`}>
                {createClickableComponent(col)}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default CoinDataSummary;
