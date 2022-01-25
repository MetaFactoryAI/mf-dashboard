import React from "react";
import { Box } from "@chakra-ui/react";
import SummaryField2 from "./shared/SummaryField2";
import { formatAddress } from "@/utils/presentationHelper";
import type { CoinData } from "@/hooks/useCoinData";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";

const CoinDataSummary: React.FC<{
  coinData: CoinData[];
}> = ({ coinData }) => {
  const { isDesktopScreen } = useChakraBreakpoints();
  const clickableLeftColumn = (
    <td style={{ border: "1px solid black", width: "50%" }}>
      <SummaryField2
        title={coinData[8].title}
        value={formatAddress(coinData[8].value.toString())}
        redirectLink={`https://etherscan.io/address/${coinData[8].value}`}
      />
    </td>
  );
  const clickableRightColumn = (
    <td style={{ border: "1px solid black", width: "50%" }}>
      <SummaryField2
        title={coinData[9].title}
        value={formatAddress(coinData[9].value.toString())}
        redirectLink={`https://etherscan.io/address/${coinData[9].value}`}
      />
    </td>
  );

  return (
    <Box pt="40px">
      <table cellSpacing="0" cellPadding="0" style={{ border: "1px solid black", width: "100%" }}>
        {coinData.map((_element, index) => {
          // skip first few values which are shown under the Chart in the main page
          if (index > 3 && index < 8 && index % 2 === 0) {
            const leftColumn = (
              <td style={{ border: "1px solid black", width: "50%" }}>
                <SummaryField2
                  title={coinData[index].title}
                  value={coinData[index].value.toString()}
                />
              </td>
            );

            const rightColumn = (
              <td style={{ border: "1px solid black", width: "50%" }}>
                <SummaryField2
                  title={coinData[index + 1].title}
                  value={coinData[index + 1].value.toString()}
                />
              </td>
            );

            return (
              <>
                {isDesktopScreen && (
                  <tr>
                    {leftColumn}
                    {rightColumn}
                  </tr>
                )}
                {!isDesktopScreen && (
                  <>
                    <tr>{leftColumn}</tr>
                    <tr>{rightColumn}</tr>
                  </>
                )}
              </>
            );
          }

          return null;
        })}

        {isDesktopScreen && (
          <tr>
            {clickableLeftColumn}
            {clickableRightColumn}
          </tr>
        )}
        {!isDesktopScreen && (
          <>
            <tr>{clickableLeftColumn}</tr>
            <tr>{clickableRightColumn}</tr>
          </>
        )}
      </table>
    </Box>
  );
};
export default CoinDataSummary;
