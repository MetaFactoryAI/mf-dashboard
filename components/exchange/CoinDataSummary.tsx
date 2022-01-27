import React from "react";
import { Box } from "@chakra-ui/react";
import SummaryField2 from "./shared/SummaryField2";
import { formatAddress } from "@/utils/presentationHelper";
import type { CoinRow } from "@/hooks/useCoinData";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";

const CoinDataSummary: React.FC<{
  coinData: CoinRow[][];
}> = ({ coinData }) => {
  const { isDesktopScreen } = useChakraBreakpoints();
  const createClickableComponent = (col: CoinRow) => (
    <td
      style={{ border: "1px solid black", width: "50%" }}
      key={`coin-data-sum-clickable-td-${col.title}`}
    >
      <SummaryField2
        title={col.title}
        value={formatAddress(col.value.toString())}
        redirectLink={`https://etherscan.io/address/${col.value}`}
      />
    </td>
  );

  return (
    <Box pt="40px">
      <table cellSpacing="0" cellPadding="0" style={{ border: "1px solid black", width: "100%" }}>
        <tbody>
          {coinData.slice(0, 2).map((cols) => {
            const createComponent = (col: CoinRow) => (
              <td
                style={{ border: "1px solid black", width: "50%" }}
                key={`coin-data-sum-td-${col.title}`}
              >
                <SummaryField2 title={col.title} value={col.value.toString()} />
              </td>
            );

            if (isDesktopScreen)
              return (
                <tr key={`coin-data-sum-tr-${cols[0].title}`}>
                  {createComponent(cols[0])}
                  {createComponent(cols[1])}
                </tr>
              );

            return cols.map((col: CoinRow) => (
              <tr key={`coin-data-sum-tr2-${col.title}`}>{createComponent(col)}</tr>
            ));
          })}

          {isDesktopScreen && (
            <tr>
              {createClickableComponent(coinData[2][0])}
              {createClickableComponent(coinData[2][1])}
            </tr>
          )}

          {!isDesktopScreen &&
            coinData[2].map((col: CoinRow) => (
              <tr key={`coin-data-sum-tr-clickable-${col.title}`}>
                {createClickableComponent(col)}
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
};
export default CoinDataSummary;
